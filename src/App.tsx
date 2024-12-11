import { useState } from 'react';
import './styles/App.scss';
import { 
  Calendar, 
  Clock, 
  CalendarCheck, 
  CalendarEvent, 
  CalendarRange, 
  ClockFill 
} from 'react-bootstrap-icons';
import DatePicker from './components/DatePicker';

function App() {
  type PickerType = 'date' | 'time' | 'datetime' | 'year';
  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>([null, null, null, null, new Date(), null, null, null]);

  const customIcons = [
    { 
      icon: Calendar,
    },
    { 
      icon: Clock, 
    },
    { 
      icon: CalendarCheck, 
    },
    { 
      icon: CalendarEvent, 
    },
    { 
      icon: CalendarRange, 
    },
    { 
      icon: ClockFill, 
    }
  ];

  const handleDateChange = (index: number) => (date: Date | null) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
  };

  const datePickerConfigs = [
    { 
      showIcon: true,
      type: 'date', 
      format: 'dd-MM-yyyy', 
      label: 'Basic Date Picker',
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">format</span>=<span class="string">"dd-MM-yyyy"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: false,
      type: 'date', 
      format: 'dd-MM-yyyy', 
      label: 'Basic Date Picker without Icon',
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">format</span>=<span class="string">"dd-MM-yyyy"</span>
  <span class="keyword">showIcon</span>=<span class="string">"false"</span>
<span class="keyword">/&#62;</span>`,
      isError: false,
    },
    { 
      showIcon: true,
      type: 'date', 
      format: 'dd-MM-yyyy', 
      label: 'Date Picker with Custom Icon',
      icon: customIcons[2].icon,
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">format</span>=<span class="string">"dd-MM-yyyy"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
  <span class="keyword">icon</span>={<span class="prop">CalendarCheck</span>}
<span class="keyword">/&#62;</span>`,
      isError: false,
    },
    { 
      showIcon: true,
      type: 'date', 
      format: 'dd-MM-yyyy', 
      label: 'Basic Date Picker with Error Message',
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">format</span>=<span class="string">"dd-MM-yyyy"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
  <span class="keyword">isError</span>=<span class="prop">true</span>
  <span class="keyword">errorMessage</span>=<span class="string">"Select a valid date"</span>
<span class="keyword">/&#62;</span>`,
      isError: true,
      errorMessage: 'Select a valid date'
    },
    { 
      showIcon: true,
      type: 'date',
      format: 'dd-MM-yyyy', 
      label: 'Date Picker with Min-Max Range (2024)',
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">format</span>=<span class="string">"dd-MM-yyyy"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
  <span class="keyword">minDate</span>={<span class="prop">new Date</span>(2024, 0, 1)}
  <span class="keyword">maxDate</span>={<span class="prop">new Date</span>(2024, 11, 31)}
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: true,
      type: 'time', 
      format: 'HH:mm', 
      label: 'Time Picker',
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"time"</span>
  <span class="keyword">format</span>=<span class="string">"HH:mm"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: true,
      type: 'datetime', 
      format: 'dd-MM-yyyy HH:mm', 
      label: 'Date and Time Picker',
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"datetime"</span>
  <span class="keyword">format</span>=<span class="string">"dd-MM-yyyy HH:mm"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: true,
      type: 'year', 
      format: 'yyyy', 
      label: 'Year Picker',
      syntax: `<span class="keyword">&#60;DatePicker</span> 
  <span class="keyword">type</span>=<span class="string">"year"</span>
  <span class="keyword">format</span>=<span class="string">"yyyy"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    }
  ];

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>DatePicker</h1>
        <p>Date and time configurations</p>
      </div>
      <div className="cards-grid">
        {datePickerConfigs.map((config, index) => (
          <div key={index} className="syntax-card">
            <div className="card-header">
              <h3>{config.label}</h3>
            </div>
            <div className="card-content">
              <div className="syntax-preview">
                <pre dangerouslySetInnerHTML={{ __html: config.syntax }} />
              </div>
              <div className="picker-demo">
                <DatePicker
                  value={selectedDates[index]}
                  isShowIcon={config.showIcon}
                  type={config.type as PickerType}
                  dateFormat={config.format}
                  onChange={handleDateChange(index)}
                  minDate={config.minDate}
                  maxDate={config.maxDate}
                  icon={config.icon}
                  isError={config.isError}
                  errorMessage={config.errorMessage}
                />
              </div>
              {selectedDates[index] && (
                <p>Selected: {selectedDates[index]?.toLocaleString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
