import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    photo: '',
    address: { lat: '', lng: '' },
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const mapSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    const mockProfiles = [
      {
        id: 1,
        name: 'Abhishek Bhavsar',
        description: 'Software Engineer',
        photo: 'https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 20.874917, lng: 75.111222 }, // Updated location to Parola, Maharashtra, India
      },
      {
        id: 2,
        name: 'Akash Gupta',
        description: 'Graphic Designer',
        photo: 'https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 19.0760, lng: 72.8777 },
      },
      {
        id: 3,
        name: 'Ravi Kumar',
        description: 'Full Stack Developer',
        photo: 'https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 22.5726, lng: 88.3639 },
      },
      {
        id: 4,
        name: 'Tanishka Sharma',
        description: 'Product Manager',
        photo: 'https://plus.unsplash.com/premium_vector-1727955580379-b469f58888e9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 17.3854, lng: 78.4867 },
      },
      {
        id: 5,
        name: 'Anil Kumar',
        description: 'Data Scientist',
        photo: 'https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 30.7333, lng: 76.7794 },
      },
      {
        id: 6,
        name: 'Sita Rani',
        description: 'UI/UX Designer',
        photo: 'https://plus.unsplash.com/premium_vector-1727955580379-b469f58888e9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 28.7041, lng: 77.1025 },
      },
      {
        id: 7,
        name: 'Maya Singh',
        description: 'Marketing Specialist',
        photo: 'https://plus.unsplash.com/premium_vector-1727955580379-b469f58888e9?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 13.0827, lng: 80.2707 },
      },
      {
        id: 8,
        name: 'Suresh Yadav',
        description: 'Mobile Developer',
        photo: 'https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: { lat: 25.5941, lng: 85.1376 },
      },
    ];
    setProfiles(mockProfiles);
  }, []);

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
    setTimeout(() => {
      if (mapSectionRef.current) {
        mapSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    // Reset the form fields to the default state when adding a new profile
    setNewProfile({
      name: '',
      description: '',
      photo: '',
      address: { lat: '', lng: '' },
    });
    setIsEditing(false);  // Reset editing state
    setShowAddForm(true);  // Show the form
  };
  
  const handleEditProfile = (profile) => {
    setNewProfile(profile); // Load the profile for editing
    setIsEditing(true); // Set editing flag to true
    setShowAddForm(true); // Show the form
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (newProfile.name && newProfile.description && newProfile.photo && newProfile.address.lat && newProfile.address.lng) {
      setProfiles(
        profiles.map((profile) =>
          profile.id === newProfile.id ? newProfile : profile
        )
      );
      setIsEditing(false);
      setNewProfile({
        name: '',
        description: '',
        photo: '',
        address: { lat: '', lng: '' },
      });
      setShowAddForm(false);
    } else {
      alert('All fields are required!');
    }
  };
  

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="heading">Profile Explorer</h1>

      {/* Add Profile Button */}
      <button onClick={() => setShowAddForm(true)} className="add-profile-btn">
        Add Profile
      </button>

      {/* Show Add/Edit Profile Form */}
      {showAddForm && (
        <div ref={formSectionRef} className="form-container">
          <h2>{isEditing ? 'Edit Profile' : 'Add New Profile'}</h2>
          <form onSubmit={isEditing ? handleUpdateProfile : handleAddProfile}>
            <input
              type="text"
              placeholder="Name"
              value={newProfile.name}
              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProfile.description}
              onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
              required
            />
            <input
              type="url"
              placeholder="Photo URL"
              value={newProfile.photo}
              onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Latitude"
              value={newProfile.address.lat}
              onChange={(e) => setNewProfile({ ...newProfile, address: { ...newProfile.address, lat: e.target.value } })}
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              value={newProfile.address.lng}
              onChange={(e) => setNewProfile({ ...newProfile, address: { ...newProfile.address, lng: e.target.value } })}
              required
            />
            <button type="submit">{isEditing ? 'Update Profile' : 'Add Profile'}</button>
          </form>
        </div>
      )}

      {/* Profile List */}
      <div className="profiles-list">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <img src={profile.photo} alt={profile.name} className="profile-img" />
            <h2>{profile.name}</h2>
            <p>{profile.description}</p>
            <button onClick={() => handleSummaryClick(profile)} className="view-map-btn">
              Summary
            </button>
            <button onClick={() => handleEditProfile(profile)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => handleDeleteProfile(profile.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Display Map of Selected Profile */}
      {selectedProfile && (
        <div ref={mapSectionRef} className="map-container">
          <h2>Location of {selectedProfile.name}</h2>
          <Map address={selectedProfile.address} />
        </div>
      )}
    </div>
  );
};

const Map = ({ address }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove(); // Remove the old map instance if any
    }

    if (address.lat && address.lng) {
      mapRef.current = L.map(mapContainerRef.current).setView([parseFloat(address.lat), parseFloat(address.lng)], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

      // Ensure the marker icon URL is correct and the icon size is appropriate
      const customIcon = L.icon({
        iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png', // Replace with your marker image URL
        iconSize: [50, 50],  // Ensure the marker size is large enough to be visible
        iconAnchor: [25, 50], // Anchor the icon at the bottom center
        popupAnchor: [0, -50] // Popup position relative to the marker
      });

      // Add the marker with the custom icon
      L.marker([parseFloat(address.lat), parseFloat(address.lng)], { icon: customIcon })
        .addTo(mapRef.current)
        .openPopup();
    } else {
      console.error('Invalid lat or lng');
    }
  }, [address]);

  return <div ref={mapContainerRef} className="map"></div>;
};


export default App;
