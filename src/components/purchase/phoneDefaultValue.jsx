import React from 'react'
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';

const phoneDefaultValue = () => {
  return (
    <>
      <PhoneInput
        country='KE'
        value={value}
        onChange={setValue}
      />
      
    </>
  );
}

export default phoneDefaultValue;