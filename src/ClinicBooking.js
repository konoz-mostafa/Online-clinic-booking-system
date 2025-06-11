// import { useState, useEffect } from "react";
// import "./ClinicBooking.css";

// export default function ClinicBooking() {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://your-api-endpoint.com/doctors'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch doctors');
//         }
//         const data = await response.json();
//         setDoctors(data);
//         setFilteredDoctors(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   function handleSearch(e) {
//     e.preventDefault();
//     const doctorName = e.target.doctorName.value.toLowerCase();
//     const clinicType = e.target.clinicType.value;

//     const results = doctors.filter((doc) => {
//       const matchName = doctorName ? doc.name.toLowerCase().includes(doctorName) : true;
//       const matchClinic = clinicType ? doc.clinic === clinicType : true;
//       return matchName && matchClinic;
//     });

//     setFilteredDoctors(results.length > 0 ? results : doctors);
//     setSelectedDoctorId(null);
//   }

//   function openBookingForm(id) {
//     setSelectedDoctorId(id);
//   }
// المريض بياخد دور عشوائي
//   function handleConfirmBooking() {   
//     if (formData.name && formData.phone && formData.email) {
//       const selectedDoctor = doctors.find(doc => doc.id === selectedDoctorId);
//       const tokenNumber = Math.floor(Math.random() * 100) + 1;
//       alert(`Booking Confirmed\nDoctor: ${selectedDoctor.name}\nToken Number: ${tokenNumber}\nVisit Time: ${selectedDoctor.time}`);
//       setFormData({ name: "", phone: "", email: "" });
//       setSelectedDoctorId(null);
//     } else {
//       alert("Please fill all fields");
//     }
//   }
// المريض بياخد دور من الباك
// function handleConfirmBooking() {
//     if (formData.name && formData.phone && formData.email) {
//       const selectedDoctor = doctors.find(doc => doc.id === selectedDoctorId);
  
//       // Simulate API call to get the token number from the backend
//       fetch('/api/book-appointment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           doctorId: selectedDoctor.id,
//           patientName: formData.name,
//           patientPhone: formData.phone,
//           patientEmail: formData.email,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const tokenNumber = data.tokenNumber; // Assuming the backend responds with a token number
  
//           alert(`Booking Confirmed\nDoctor: ${selectedDoctor.name}\nToken Number: ${tokenNumber}\nVisit Time: ${selectedDoctor.time}`);
  
//           setFormData({ name: "", phone: "", email: "" });
//           setSelectedDoctorId(null);
//         })
//         .catch((error) => {
//           alert('Error booking appointment. Please try again later.');
//           console.error(error);
//         });
//     } else {
//       alert("Please fill all fields");
//     }
//   }
  

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="clinic-container">
//       <h1 className="clinic-header">Welcome to Our Clinic</h1>

//       <form onSubmit={handleSearch} className="clinic-search-form">
//         <input type="date" id="date" name="date" className="clinic-input" defaultValue={new Date().toISOString().slice(0, 10)} />
//         <input type="text" id="doctorName" name="doctorName" placeholder="Doctor Name" className="clinic-input" />
//         <select id="clinicType" name="clinicType" className="clinic-input">
//           <option value="">Select Clinic Type</option>
//           <option value="Dental">Dental</option>
//           <option value="Dermatology">Dermatology</option>
//           <option value="Neurology">Neurology</option>
//           <option value="Orthopedics">Orthopedics</option>
//           <option value="Gynecology">Gynecology</option>
//           <option value="Urology">Urology</option>
//           <option value="Ophthalmology">Ophthalmology</option>
//           <option value="ENT">ENT</option>
//         </select>
//         <button type="submit" className="clinic-button">Search</button>
//       </form>

//       <div className="clinic-cards-container">
//         {filteredDoctors.map((doctor) => (
//           <div key={doctor.id} className="clinic-card">
//             <h3 className="clinic-card-name">{doctor.name}</h3>
//             <p>Clinic: {doctor.clinic}</p>
//             <p>Time: {doctor.time}</p>
//             <p> {doctor.available ? "Available" : "Apologized"}</p>
//             <p>Price: ${doctor.price}</p>

//             {doctor.available ? (
//               <button
//                 className="clinic-card-button"
//                 onClick={() => openBookingForm(doctor.id)}
//               >
//                 Book appointment
//               </button>
//             ) : (
//               <button
//                 className="clinic-card-button"
//                 style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}
//                 disabled
//               >
//                 Not Available
//               </button>
//             )}

//             {selectedDoctorId === doctor.id && doctor.available && (
//               <div className="clinic-booking-form">
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   className="clinic-form-input"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Your Phone"
//                   className="clinic-form-input"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   className="clinic-form-input"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//                 <button
//                   className="clinic-form-button"
//                   onClick={handleConfirmBooking}
//                 >
//                   Confirm Booking
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// =====================
import { useState, useEffect } from "react";
import "./ClinicBooking.css";

export default function ClinicBooking() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from a mock API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        // Mock API URL (replace with actual backend URL when it's available)
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Fake API for testing
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        
        // Mapping mock data to the required format for testing
        const formattedDoctors = data.map((doctor, index) => ({
          id: index + 1,
          name: doctor.name,
          clinic: "General", // Assigning a default clinic type
          available: true,  // Assume all doctors are available for testing
          time: "10:00 AM - 2:00 PM", // Static time for testing
          price: 50 + index * 10, // Incrementing price for each doctor
        }));
        
        setDoctors(formattedDoctors);
        setFilteredDoctors(formattedDoctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const doctorName = e.target.doctorName.value.toLowerCase();
    const clinicType = e.target.clinicType.value;

    const results = doctors.filter((doc) => {
      const matchName = doctorName ? doc.name.toLowerCase().includes(doctorName) : true;
      const matchClinic = clinicType ? doc.clinic === clinicType : true;
      return matchName && matchClinic;
    });

    setFilteredDoctors(results.length > 0 ? results : doctors);
    setSelectedDoctorId(null);
  }

  function openBookingForm(id) {
    setSelectedDoctorId(id);
  }

  function handleConfirmBooking() {
    if (formData.name && formData.phone && formData.email) {
      const selectedDoctor = doctors.find(doc => doc.id === selectedDoctorId);
      const tokenNumber = Math.floor(Math.random() * 100) + 1;
      alert(`Booking Confirmed\nDoctor: ${selectedDoctor.name}\nToken Number: ${tokenNumber}\nVisit Time: ${selectedDoctor.time}`);
      setFormData({ name: "", phone: "", email: "" });
      setSelectedDoctorId(null);
    } else {
      alert("Please fill all fields");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="clinic-container">
      <h1 className="clinic-header">Welcome to Our Clinic</h1>

      <form onSubmit={handleSearch} className="clinic-search-form">
        <input type="date" id="date" name="date" className="clinic-input" defaultValue={new Date().toISOString().slice(0, 10)} />
        <input type="text" id="doctorName" name="doctorName" placeholder="Doctor Name" className="clinic-input" />
        <select id="clinicType" name="clinicType" className="clinic-input">
          <option value="">Select Clinic Type</option>
          <option value="Dental">Dental</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Urology">Urology</option>
          <option value="Ophthalmology">Ophthalmology</option>
          <option value="ENT">ENT</option>
        </select>
        <button type="submit" className="clinic-button">Search</button>
      </form>

      <div className="clinic-cards-container">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="clinic-card">
            <h3 className="clinic-card-name">{doctor.name}</h3>
            <p>Clinic: {doctor.clinic}</p>
            <p>Time: {doctor.time}</p>
            <p>Status: {doctor.available ? "Available" : "Apologized"}</p>
            <p>Price: ${doctor.price}</p>

            {doctor.available ? (
              <button
                className="clinic-card-button"
                onClick={() => openBookingForm(doctor.id)}
              >
                Book appointment
              </button>
            ) : (
              <button
                className="clinic-card-button"
                style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}
                disabled
              >
                Not Available
              </button>
            )}

            {selectedDoctorId === doctor.id && doctor.available && (
              <div className="clinic-booking-form">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="clinic-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="clinic-form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="clinic-form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <button
                  className="clinic-form-button"
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
