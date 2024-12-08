import moment from 'moment';
import React, { forwardRef, ForwardedRef, useState, useImperativeHandle } from 'react';
import { Calendar2, Clock, X } from 'react-bootstrap-icons';
import type { IconProps } from 'react-bootstrap-icons';

export interface DateTimePickerRef {
  getValue: () => Date | null;
  setValue: (date: Date | null) => void;
  clear: () => void;
}

type PickerType = 'date' | 'time' | 'datetime' | 'year';

interface DateTimePickerProps {
  onChange?: (date: Date | null) => void;
  className?: string;
  format?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: Date;
  type?: PickerType | 'datetime';
  showIcon?: boolean;
  icon?: React.ComponentType<IconProps>;
  minDate?: Date; 
  maxDate?: Date; 
  isError?: boolean;
  errorMessage?: string;
}

const DateTimePicker = forwardRef((
  { 
    onChange, 
    className = '', 
    format = 'yyyy-MM-dd',
    placeholder = 'Select date and time',
    disabled = false,
    defaultValue,
    type = 'datetime',
    showIcon = false,
    icon: CustomIcon,
    minDate,
    maxDate,
    isError = false,
    errorMessage = '',
  }: DateTimePickerProps,
  ref: ForwardedRef<DateTimePickerRef>
) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const [displayedYear, setDisplayedYear] = useState(currentYear);

  useImperativeHandle(ref, () => ({
    getValue: () => selectedDate,
    setValue: (date: Date | null) => {
      setSelectedDate(date);
      onChange?.(date);
    },
    clear: () => {
      setSelectedDate(null);
      onChange?.(null);
    }
  }));

  const isDateWithinRange = (date: Date) => {
    debugger
    if (minDate && date < minDate) return false;
    if (maxDate && date >= maxDate) return false;
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setSelectedDate(null);
      onChange?.(null);
      return;
    }

    let newDate: Date | null = null;
    
    switch (type) {
      case 'time':
        // For time-only, we use today's date with the selected time
        newDate = new Date();
        const [hours, minutes] = value.split(':');
        newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        break;
      
      case 'date':
        // For date-only, we set the time to midnight
        newDate = new Date(value);
        break;
      
      case 'year':
        // For year-only, set to January 1st of selected year
        newDate = new Date(parseInt(value, 10), 0, 1);
        newDate.setHours(0, 0, 0, 0);
        break;

      case 'datetime':
      default:
        newDate = new Date(value);
        break;
    }

    if (newDate && isDateWithinRange(newDate)) {
      setSelectedDate(newDate);
      onChange?.(newDate);
    }
  };

  const formatDateTimeForInput = (date: Date | null): string => {
    if (!date) return '';

    // Default formats for different types
    const defaultFormats = {
      time: 'HH:mm',
      date: 'YYYY-MM-DD',
      year: 'YYYY',
      datetime: 'YYYY-MM-DD HH:mm'
    };

    try {
      // Use provided format or fallback to default
      const formatToUse = format || defaultFormats[type as keyof typeof defaultFormats] || defaultFormats.datetime;

      // Support localization if needed
      const formattedDate = moment(date).locale(navigator.language).format(formatToUse);
      
      return formattedDate.toString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return date.toLocaleString(); // Fallback to browser's default localization
    }
  };

  const getInputType = (): string => {
    switch (type) {
      case 'time':
        return 'time';
      case 'date':
        return 'date';
      case 'year':
        return 'text';
      case 'datetime':
      default:
        return 'datetime-local';
    }
  };

  const getPlaceholder = (): string => {
    switch (type) {
      case 'time':
        return placeholder || 'Select time';
      case 'date':
        return placeholder || 'Select date';
      case 'year':
        return placeholder || 'Select year';
      case 'datetime':
      default:
        return placeholder || 'Select date and time';
    }
  };

  const getIcon = () => {
    if (CustomIcon) {
      return <CustomIcon className="picker-icon" />;
    }

    switch (type) {
      case 'time':
        return <Clock className="picker-icon" />;
      case 'year':
      case 'date':
        return <Calendar2 className="picker-icon" />;
      case 'datetime':
      default:
        return <Calendar2 className="picker-icon" />;
    }
  };

  const handleYearClick = (year: number) => {
    const newDate = new Date(year, 0, 1);
    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const renderYearContent = () => {
    if (type !== 'year' || !isOpen) return null;

    const startYear = Math.floor(displayedYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i - 1);

    return (
      <div className="year-picker-dropdown">
        <div className="year-picker-header">
          <button onClick={() => setDisplayedYear(displayedYear - 10)}>&lt;</button>
          <span>{years[1]} - {years[10]}</span>
          <button onClick={() => setDisplayedYear(displayedYear + 10)}>&gt;</button>
        </div>
        <div className="year-picker-grid">
          {years.map(year => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className={`year-button ${selectedDate?.getFullYear() === year ? 'selected' : ''}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleInputClick = () => {
    if (type === 'year') {
      setIsOpen(!isOpen);
    }
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange?.(null);
    setIsOpen(false);
  };

  return (
    <div className={`datetime-picker-container ${showIcon ? 'with-icon' : ''} ${selectedDate ? 'has-value' : ''} ${isError ? 'has-error' : ''}`}>
      {showIcon && getIcon()}
      <input
        type={getInputType()}
        className={`datetime-picker ${className}`}
        value={formatDateTimeForInput(selectedDate)}
        onChange={handleChange}
        onClick={handleInputClick}
        placeholder={getPlaceholder()}
        disabled={disabled}
        readOnly={type === 'year'}
        min={minDate ? formatDateTimeForInput(minDate) : undefined}
        max={maxDate ? formatDateTimeForInput(maxDate) : undefined}
      />
      {selectedDate && !disabled && (
        <button 
          className="clear-button" 
          onClick={handleClearClick}
          type="button"
          aria-label="Clear value"
        >
          <X />
        </button>
      )}
      {isError && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      {renderYearContent()}
    </div>
  );
});

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;