import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import styles from "./AdminBookingManagement.module.css";

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState({ status: "", hall: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await ApiService.request({
        url: "/api/admin/bookings",
        method: "GET",
      });
      setBookings(res);
    } catch (err) {
      if (err.status && err.body?.error) {
        setError(err.body.error);
      } else {
        setError("שגיאה בטעינת ההזמנות");
      }
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await ApiService.request({
        url: `/api/admin/bookings/${id}`,
        method: "PATCH",
        body: { status: newStatus },
      });
      fetchBookings();
    } catch (err) {
      if (err.status && err.body?.error) {
        setError(err.body.error);
      } else {
        setError("שגיאה בעדכון הסטטוס");
      }
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק הזמנה זו?")) return;
    try {
      await ApiService.request({
        url: `/admin/bookings/${id}`,
        method: "DELETE",
      });
      fetchBookings();
    } catch (err) {
      if (err.status && err.body?.error) {
        setError(err.body.error);
      } else {
        setError("שגיאה במחיקת ההזמנה");
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // פונקציה לעיצוב תאריך
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const filteredBookings = bookings.filter((b) => {
    return (
      (!filter.status || b.status === filter.status) &&
      (!filter.hall || b.hall_name.includes(filter.hall))
    );
  });

  return (
    <div className={styles.container}>
      <h2>ניהול הזמנות</h2>
      <div className={styles.filters}>
        <input
          name="hall"
          placeholder="סינון לפי אולם"
          value={filter.hall}
          onChange={handleFilterChange}
        />
        <select name="status" value={filter.status} onChange={handleFilterChange}>
          <option value="">הכל</option>
          <option value="confirmed">מאושר</option>
          <option value="canceled">בוטל</option>
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {filteredBookings.length === 0 ? (
        <p className={styles.noBookings}>לא קיימות הזמנות</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>מס׳</th>
              <th>משתמש</th>
              <th>אולם</th>
              {/* <th>בעל אולם</th> */}
              <th>תאריך</th>
              <th>סטטוס</th>
              {/* <th>פעולות</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user_name}</td>
                <td>{b.hall_name}</td>
                {/* <td>{b.owner_id}</td>  */}
                <td>{formatDate(b.event_date)}</td>
                <td>
                  <label>{b.status}</label>
                </td>
                {/* <td>
                  <button onClick={() => deleteBooking(b.id)}>🗑️ מחיקה</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookingManagement;
