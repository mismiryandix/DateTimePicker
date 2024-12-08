import React, { useRef, useState } from 'react';
import './styles/App.scss';
import DateTimePicker from './components/DateTimePicker';

function App() {
  const dateTimePickerRef = useRef(null);
  type PickerType = 'date' | 'time' | 'datetime' | 'year';
  const [selectedDates, setSelectedDates] = useState<(Date | null)[]>([null, null, null, null]);

  const handleDateChange = (index: number) => (date: Date | null) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
  };

  const datePickerConfigs = [
    { 
      showIcon: true,
      type: 'date', 
      format: 'yyyy-MM-DD', 
      placeholder: 'Select Date', 
      label: 'Basic Date Picker',
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: false,
      type: 'date', 
      format: 'yyyy-MM-DD', 
      placeholder: 'Select Date', 
      label: 'Basic Date Picker without Icon',
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">showIcon</span>=<span class="string">"false"</span>
<span class="keyword">/&#62;</span>`,
      isError: false,
    },
    { 
      showIcon: true,
      type: 'date', 
      format: 'yyyy-MM-DD', 
      placeholder: 'Select Date', 
      label: 'Basic Date Picker with Error Message',
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
  <span class="keyword">showIcon</span>=<span class="string">"false"</span>
  <span class="keyword">isError</span>=<span class="prop">true</span>
  <span class="keyword">errorMessage</span>=<span class="string">"Select a valid date"</span>
<span class="keyword">/&#62;</span>`,
      isError: true,
      errorMessage: 'Please select a valid date'
    },
    { 
      showIcon: true,
      type: 'date', 
      format: 'yyyy-MM-DD', 
      placeholder: 'Select Date', 
      label: 'Date Picker with Range (2024)',
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2024, 11, 31),
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"date"</span>
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
      placeholder: 'Select Time', 
      label: 'Time Picker',
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"time"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: true,
      type: 'datetime', 
      format: 'yyyy-MM-DD HH:mm', 
      placeholder: 'Select Date and Time', 
      label: 'Date and Time Picker',
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"datetime"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    },
    { 
      showIcon: true,
      type: 'year', 
      format: 'YYYY', 
      placeholder: 'Select Year', 
      label: 'Year Picker',
      syntax: `<span class="keyword">&#60;DateTimePicker</span> 
  <span class="keyword">type</span>=<span class="string">"year"</span>
  <span class="keyword">showIcon</span>=<span class="string">"true"</span>
<span class="keyword">/&#62;</span>`,
      isError: false
    }
  ];

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>DateTimePicker</h1>
        <p>Date and time picking configurations</p>
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
                <DateTimePicker
                  showIcon={config.showIcon}
                  ref={dateTimePickerRef}
                  type={config.type as PickerType}
                  format={config.format}
                  placeholder={config.placeholder}
                  onChange={handleDateChange(index)}
                  minDate={config.minDate}
                  maxDate={config.maxDate}
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
