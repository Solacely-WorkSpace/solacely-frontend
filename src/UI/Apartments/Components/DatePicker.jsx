"use client";
import Image from "next/image";
import React, { useRef } from 'react';
import { inspectionService } from '../../../lib/api/services/inspectionService';



const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function TimePickerModal({ open, onClose, onConfirm, initialTime }) {
  const [hour, setHour] = React.useState(initialTime?.hour || 7);
  const [minute, setMinute] = React.useState(initialTime?.minute || 0);
  const [ampm, setAMPM] = React.useState(initialTime?.ampm || 'AM');
  const [selecting, setSelecting] = React.useState('hour');

  const handleClockClick = (val) => {
    if (selecting === 'hour') {
      setHour(val);
      setSelecting('minute');
    } else {
      setMinute(val);
    }
  };

  const handleConfirm = () => {
    onConfirm({ hour, minute, ampm });
  };

  // Generate clock numbers
  const numbers = selecting === 'hour' ? [12,1,2,3,4,5,6,7,8,9,10,11] : [0,5,10,15,20,25,30,35,40,45,50,55];

  // Calculate hand angle
  let handAngle = 0;
  if (selecting === 'hour') {
    // For hours: 12 is at top (0°), 3 is at right (90°), etc.
    const hourFor12 = hour === 12 ? 0 : hour;
    handAngle = (hourFor12 * 30) - 90; // 30° per hour, -90° to start from top
  } else {
    // For minutes: 0 is at top (0°), 15 is at right (90°), etc.
    handAngle = (minute * 6) - 90; // 6° per minute, -90° to start from top
  }

  return open ? (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-black">&times;</button>
        <h2 className="text-xl font-bold text-center mb-4">Select Time</h2>
        
        {/* SELECT TIME label */}
        <div className="text-xs text-gray-400 font-medium mb-3 text-center">SELECT TIME</div>
        
        {/* Time display */}
        <div className="flex justify-center items-center gap-1 mb-3">
          <button 
            className={`text-3xl font-bold px-4 py-2 rounded-lg ${selecting==='hour'?'bg-purple-100 text-primary':'text-gray-800'}`} 
            onClick={()=>setSelecting('hour')}
          >
            {hour}
          </button>
          <span className="text-5xl font-bold text-gray-800 mx-2">:</span>
          <button 
            className={`text-3xl font-bold px-4 py-2 rounded-lg ${selecting==='minute'?'bg-purple-100 text-primary':'text-gray-800'}`} 
            onClick={()=>setSelecting('minute')}
          >
            {minute.toString().padStart(2,'0')}
          </button>
          <div className="flex flex-col ml-4 gap-1">
            <button 
              className={`text-xs px-3 py-1 rounded ${ampm==='AM'?'bg-purple-100 text-primary font-bold':'bg-gray-100 text-gray-600'}`} 
              onClick={()=>setAMPM('AM')}
            >
              AM
            </button>
            <button 
              className={`text-xs px-3 py-1 rounded ${ampm==='PM'?'bg-purple-100 text-primary font-bold':'bg-gray-100 text-gray-600'}`} 
              onClick={()=>setAMPM('PM')}
            >
              PM
            </button>
          </div>
        </div>
        
        {/* Clock */}
        <div className="relative w-64 h-64 mx-auto mb-3">
          {/* Clock background */}
          <div className="absolute inset-0 rounded-full bg-gray-100"></div>
          
          {/* Numbers */}
          {numbers.map((num, idx) => {
            const angle = (Math.PI/2) - (2*Math.PI*idx/numbers.length);
            const x = 128 + 92 * Math.cos(angle);
            const y = 128 - 92 * Math.sin(angle);
            const isSelected = (selecting==='hour' && num===hour) || (selecting==='minute' && num===minute);
            return (
              <button
                key={num}
                className={`absolute flex items-center justify-center rounded-full text-lg font-medium transition-all duration-150 ${
                  isSelected
                    ? 'bg-primary text-white w-10 h-10 font-bold'
                    : 'text-gray-700 w-8 h-8 hover:bg-gray-200'
                }`}
                style={{ left: x - (isSelected ? 20 : 16), top: y - (isSelected ? 20 : 16) }}
                onClick={()=>handleClockClick(num)}
              >
                {selecting === 'hour' ? num : (num === 0 ? '00' : num.toString().padStart(2,'0'))}
              </button>
            );
          })}
          

        </div>
        
        {/* Bottom buttons */}
        <div className="flex justify-between items-center">
          <button className="text-primary font-semibold text-sm" onClick={onClose}>CANCEL</button>
          <button className="text-primary font-semibold text-sm" onClick={handleConfirm}>OK</button>
        </div>
      </div>
    </div>
  ) : null;
}

function InspectionDetails({ open, onClose, onBack, onSend, bookingDate, bookingTime }) {
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (time) => {
    return `${time.hour}:${time.minute.toString().padStart(2,'0')}${time.ampm.toLowerCase()}`;
  };

  return open ? (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-4 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-black">&times;</button>
        <h2 className="text-lg font-bold text-center mb-8">Inspection Details</h2>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="text-green-600 font-medium mb-2">
            Booking Time: {bookingTime ? formatTime(bookingTime) : ''}
          </div>
          <div className="text-green-600 font-medium">
            Booking Date: {bookingDate ? formatDate(bookingDate) : ''}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button className="text-primary font-semibold" onClick={onBack}>Back</button>
          <button className="bg-primary text-white px-8 py-2 rounded font-semibold" onClick={onSend}>Send</button>
        </div>
      </div>
    </div>
  ) : null;
}

function BookingSuccess({ open, onClose }) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return open ? (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-black">&times;</button>
        <div className="mb-6">
          <Image
            src="/images/confirmation.png"
            alt="Success"
            width={120}
            height={120}
            className="mx-auto mb-6 w-42 h-30"
          />
        </div>
        <p className="text-black text-center leading-relaxed">
          Details of your inspection booking has been received,<br/>
          you will receive an email from us shortly
        </p>
      </div>
    </div>
  ) : null;
}

const DatePicker = ({ onSelect, onClose, apartmentId }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [showInspectionDetails, setShowInspectionDetails] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [tempDate, setTempDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const handleDateNext = () => {
    if (selectedDate) {
      setTempDate(selectedDate);
      setShowTimePicker(true);
    }
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
    setShowInspectionDetails(true);
  };

  const handleInspectionBack = () => {
    setShowInspectionDetails(false);
    setShowTimePicker(true);
  };

  const handleSend = async () => {
    try {
      if (!apartmentId) {
        console.error('Apartment ID is required');
        return;
      }
      
      // Format the date and time for API
      const date = new Date(tempDate);
      let hour = selectedTime.hour;
      if (selectedTime.ampm === 'PM' && hour !== 12) hour += 12;
      if (selectedTime.ampm === 'AM' && hour === 12) hour = 0;
      
      date.setHours(hour, selectedTime.minute, 0, 0);
      
      const bookingData = {
        apartment: apartmentId,
        scheduled_time: date.toISOString()
      };
      
      console.log('Sending booking data:', bookingData);
      
      await inspectionService.createBooking(bookingData);
      
      setShowInspectionDetails(false);
      setShowTimePicker(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <>
      {!showTimePicker && !showInspectionDetails && !showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-4 pt-4 relative animate-in fade-in zoom-in duration-300">
            <button onClick={onClose} className="absolute right-3 bg-gray-100 px-2 rounded-full top-4 text-2xl text-gray-800 hover:text-black">&times;</button>
            <h2 className="text-2xl font-bold text-center mb-4 mt-2" style={{textShadow:'0 2px 4px #0001'}}>Select Date</h2>
            <div className="flex items-center justify-between mb-2 px-2">
              <button onClick={handlePrevMonth} className="text-primary text-2xl bg-complementary rounded-lg px-1 hover:text-black">&#60;</button>
              <span className="font-semibold text-gray-700">{months[currentMonth]} {currentYear}</span>
              <button onClick={handleNextMonth} className="text-primary text-2xl bg-complementary rounded-lg px-1 hover:text-black">&#62;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-primary font-medium bg-gray-200 mb-2 mt-4">
              {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d=>(<div key={d}>{d[0]}</div>))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-base">
              {Array(firstDay).fill(null).map((_,i)=>(<div key={'empty'+i}></div>))}
              {Array(daysInMonth).fill(null).map((_,i)=>{
                const day = i+1;
                const isSelected = selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear;
                return (
                  <button
                    key={day}
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all ${isSelected ? 'bg-primary text-white font-bold shadow-lg' : 'hover:bg-purple-100'}`}
                    onClick={()=>handleDayClick(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <button
              className="mt-6 w-full py-2 rounded bg-emerald-400 text-white font-semibold text-lg hover:bg-emerald-500 transition disabled:opacity-50"
              onClick={handleDateNext}
              disabled={!selectedDate}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <TimePickerModal open={showTimePicker} onClose={()=>setShowTimePicker(false)} onConfirm={handleTimeConfirm} />
      <InspectionDetails 
        open={showInspectionDetails} 
        onClose={onClose} 
        onBack={handleInspectionBack}
        onSend={handleSend}
        bookingDate={tempDate}
        bookingTime={selectedTime}
      />
      <BookingSuccess open={showSuccess} onClose={onClose} />
    </>
  );
};

export default DatePicker;