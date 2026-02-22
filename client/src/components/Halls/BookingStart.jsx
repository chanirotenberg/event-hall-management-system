import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../services/ApiService';

const BookingStart = () => {
  const { hallId } = useParams();
  const navigate = useNavigate();
  const [blockedDates, setBlockedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem('bookingData');
    if (saved) {
      const data = JSON.parse(saved);
      return data.date ? new Date(data.date) : null;
    }
    return null;
  });
  const [hallPrice, setHallPrice] = useState(0);
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookingData') || '{}');

    // אם ה־hallId השתנה – איפוס כל ההזמנה
    if (saved.hallId && saved.hallId !== hallId) {
      localStorage.setItem('bookingData', JSON.stringify({}));
      console.log("🧹 הזמנה נוקתה כי נבחר אולם אחר");
    }

    const fetchBlockedDates = async () => {
      try {
        const res = await ApiService.request({
          url: `/api/bookings/unavailable/${hallId}`,
        });
        setBlockedDates(res.map(d => new Date(d)));
      } catch (err) {
        console.error("שגיאה בטעינת תאריכים:", err);
      }
    };

    const fetchHall = async () => {
      try {
        const hall = await ApiService.request({ url: `/api/halls/${hallId}` });
        setHallPrice(hall.price);
        const saved = JSON.parse(localStorage.getItem('bookingData') || '{}');
        saved.hall_price = hall.price;
        saved.hallId = hallId;
        localStorage.setItem('bookingData', JSON.stringify(saved));
      } catch (err) {
        console.error("שגיאה בטעינת אולם:", err);
      }
    };

    fetchBlockedDates();
    fetchHall();
  }, [hallId]);


  const handleDateChange = (date) => {
    setSelectedDate(date);

    const saved = JSON.parse(localStorage.getItem('bookingData') || '{}');
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    saved.date = `${yyyy}-${mm}-${dd}`; // ← זה הפורמט המדויק!
    saved.hallId = hallId;
    saved.hall_price = hallPrice;
    localStorage.setItem('bookingData', JSON.stringify(saved));
  };



  const goNext = () => {
    if (selectedDate) navigate(`/booking/catering/${hallId}`);
  };

  return (
    <div>
      <h2>בחירת תאריך</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        excludeDates={blockedDates}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
      />
      <button onClick={goNext} disabled={!selectedDate}>הבא</button>
    </div>
  );
};

export default BookingStart;