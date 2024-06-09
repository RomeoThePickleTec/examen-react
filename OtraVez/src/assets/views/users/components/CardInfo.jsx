/* eslint-disable react/prop-types */
import userDemo from '../../../../assets/views/MaleUser.jpg';
import femaleUser from '../../../../assets/views/FemaleUser.png';
import { useEffect, useState } from 'react';

const CardInfo = ({ user }) => {
 
    console.log(typeof user)
    const [image, setImage] = useState('')
    
    const fetchImage = () => {

      if(user.gender == "Male"){
            setImage(userDemo);
        } else{
            setImage(femaleUser);
        }
      console.log(user.gender);
    }

    useEffect(() => {
        fetchImage()
    }, [user])

  return (
    <div
      style={{
        width: '500px',
        height: '400px',
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        padding: '20px',
      }}
    >
      <div>
        <img src={image} alt="user" style={{ width: '140px' }} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyItems: 'left',
          flexDirection: 'column'
        }}
      >
        <p style={{ fontSize: '24px' }}>Personal Information</p>
        <p style={{ fontSize: '14px' }}>Nombre:</p>
        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
        <p style={{ fontSize: '14px' }}>Email:</p>
        <p style={{ fontWeight: 'bold' }}>{user.email}</p>
        <p style={{ fontSize: '14px' }}>Edad:</p>
        <p style={{ fontWeight: 'bold' }}>{user.age}</p>
        <p style={{ fontSize: '14px' }}>Direccion:</p>
        <p style={{ fontWeight: 'bold' }}>{user.address}</p>
      </div>
    </div>
  );
};

export default CardInfo;