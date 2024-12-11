import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { 
  Calendar3,
  ChevronLeft, 
  ChevronRight,
  Clock,
  X,
} from 'react-bootstrap-icons';
import type { IconProps } from 'react-bootstrap-icons';

interface DatePickerProps {
  type?: 'date' | 'datetime' | 'year' | 'time';
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  isError?: boolean;
  errorMessage?: string;
  icon?: React.ComponentType<IconProps>;
  dateFormat?: string;
  isShowIcon?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  type = 'date',
  value = null,
  onChange,
  minDate,
  maxDate,
  isError = false,
  errorMessage = '',
  icon: CustomIcon,
  dateFormat = 'dd-MM-yyyy',
  isShowIcon = true,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [displayedDate, setDisplayedDate] = useState<Date | null>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'calendar' | 'month' | 'year' | 'time'>('calendar');
  const datePickerRef = useRef<HTMLDivElement>(null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateInRange = (date: Date) => {
    if (minDate) {
      const minDateCopy = new Date(minDate);
      minDateCopy.setHours(0, 0, 0, 0);
      if (date < minDateCopy) return false;
    }
    if (maxDate) {
      const maxDateCopy = new Date(maxDate);
      maxDateCopy.setHours(0, 0, 0, 0);
      if (date > maxDateCopy) return false;
    }
    return true;
  };
  
  const handleDateSelect = (day: number) => {
    const newSelectedDate = selectedDate || new Date();
    const newDate = new Date(newSelectedDate?.getFullYear() ?? 0, newSelectedDate?.getMonth() ?? 0, day);
    if (isDateInRange(newDate)) {
      // setSelectedDate(newDate);
      updateDisplayedDate(newDate);
      onChange?.(newDate);
      if (type !== 'datetime') {
        setIsOpen(false);
      }
    }
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedDate?.getFullYear() ?? 0, selectedDate?.getMonth() ?? 0, selectedDate?.getDate() ?? 0);
    newDate.setFullYear(year);
    // setSelectedDate(newDate);
    updateDisplayedDate(newDate);
    if (type === 'year') {
      setIsOpen(false);
      return
    }
    setCurrentView('calendar');
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(selectedDate?.getFullYear() ?? 0, monthIndex, selectedDate?.getDate() ?? 0);
    // setSelectedDate(newDate);
    updateDisplayedDate(newDate);
    setCurrentView('calendar');
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    const newDate = new Date(selectedDate?.getFullYear() ?? 0, selectedDate?.getMonth() ?? 0, selectedDate?.getDate() ?? 0);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    // setSelectedDate(newDate);
    updateDisplayedDate(newDate);
    onChange?.(newDate);
  };

  const renderCalendar = () => {
    const defaultDate = selectedDate || new Date();
    const daysInMonth = getDaysInMonth(defaultDate);
    const firstDay = getFirstDayOfMonth(defaultDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), day);
      const isSelected = day === defaultDate.getDate() && isDateInRange(date);
      const isDisabled = !isDateInRange(date);

      days.push(
        <div
          key={day}
          className={`day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && handleDateSelect(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const renderYearSelector = () => {
    const viewYear = selectedDate || new Date();
    const currentYear = viewYear.getFullYear();
    const years = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(
        <div
          key={year}
          className={`year ${year === currentYear ? 'selected' : ''}`}
          onClick={() => handleYearSelect(year)}
        >
          {year}
        </div>
      );
    }
    return years;
  };

  const renderMonthSelector = () => {
    const viewMonth = selectedDate || new Date();
    return months.map((month, index) => (
      <div
        key={month}
        className={`month ${index === viewMonth.getMonth() ? 'selected' : ''}`}
        onClick={() => handleMonthSelect(index)}
      >
        {month}
      </div>
    ));
  };

  const renderTimeSelector = () => {
    const hours = selectedDate?.getHours() || 0;
    const minutes = selectedDate?.getMinutes() || 0;

    return (
      <div className="time-selector">
        <div className="time-label">Select Time</div>
        <div className="time-fields">
          <div className="time-field">
            <select
              value={hours}
              onChange={(e) => handleTimeChange(parseInt(e.target.value), minutes)}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <div className="time-unit">HH</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-field">
            <select
              value={minutes}
              onChange={(e) => handleTimeChange(hours, parseInt(e.target.value))}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <div className="time-unit">MM</div>
          </div>
        </div>
      </div>
    );
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'time':
        return 'HH:mm';
      case 'year':
        return 'yyyy';
      default:
        return dateFormat;
    }
  };

  const formatDate = () => {
    if (!selectedDate) return getPlaceholder();
    
    if (type === 'time') {
      return format(selectedDate, dateFormat || 'HH:mm');
    }
    if (type === 'datetime') {
      return format(selectedDate, `${dateFormat}`);
    }
    if (type === 'year') {
      return format(selectedDate, 'yyyy');
    }
    return format(displayedDate || selectedDate, dateFormat);
  };

  const getIcon = () => {
    if (CustomIcon) {
      return <CustomIcon className="default-icon" />;
    }

    switch (type) {
      case 'time':
        return <Clock className="default-icon" />;
      case 'year':
      case 'date':
        return <Calendar3 className="default-icon" />;
      case 'datetime':
      default:
        return <Calendar3 className="default-icon" />;
    }
  };

  const updateDisplayedDate = (date: Date | null) => {
    setSelectedDate(date);
    if (date && isDateInRange(date)) {
      setDisplayedDate(date);
    }
  };

  return (
    <div className="datepicker-container" ref={datePickerRef}>
      <div 
        className={`datepicker-input ${isError ? 'error' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isShowIcon && getIcon()}
        <span className={!selectedDate ? 'placeholder' : ''}>{formatDate()}</span>
        {selectedDate && (
          <button
            className="clear-button"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
              // setSelectedDate(null);
              updateDisplayedDate(null);
            }}
          >
            <X />
          </button>
        )}
      </div>
      
      {isError && errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {isOpen && (
        <div className="datepicker-dropdown">
          {type !== 'time' && (
            <div className="datepicker-header">
              <button onClick={() => {
                const newDate = new Date(selectedDate || new Date());
                if(type === 'year') {
                  newDate.setFullYear(newDate.getFullYear() - 1);
                }
                if(type !== 'year') {
                  newDate.setMonth(newDate.getMonth() - 1);
                }
                // setSelectedDate(newDate);
                updateDisplayedDate(newDate);
              }}><ChevronLeft size={16} />
              </button>
              
              <div className="current-date">
                <span onClick={() => setCurrentView('month')} hidden={type === 'year'}>
                  {selectedDate ? months[selectedDate.getMonth()] : months[new Date().getMonth()]}
                </span>
                <span onClick={() => setCurrentView('year')}>
                  {selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()}
                </span>
              </div>

              <button onClick={() => {
                const newDate = new Date(selectedDate || new Date());
                if(type === 'year') {
                  newDate.setFullYear(newDate.getFullYear() + 1);
                }
                if(type !== 'year') {
                  newDate.setMonth(newDate.getMonth() + 1);
                }
                // setSelectedDate(newDate);
                updateDisplayedDate(newDate);
              }}><ChevronRight size={16} />
              </button>
            </div>
          )}

          <div className="datepicker-body">
            {type === 'year' && (
              <div className="years">
                {renderYearSelector()}
              </div>
            )}
            {currentView === 'calendar' && type !== 'time' && type !== 'year' && (
              <>
                <div className="weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="weekday">{day}</div>
                  ))}
                </div>
                <div className="days">
                  {renderCalendar()}
                </div>
              </>
            )}
            
            {currentView === 'year' && type !== 'year' && (
              <div className="years">
                {renderYearSelector()}
              </div>
            )}
            
            {currentView === 'month' && (
              <div className="months">
                {renderMonthSelector()}
              </div>
            )}

            {(type === 'datetime' || type === 'time') && (
              <div className="time-container">
                {renderTimeSelector()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
