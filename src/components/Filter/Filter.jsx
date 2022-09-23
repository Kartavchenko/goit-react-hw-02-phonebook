import React from 'react';

export function Filter({ value, onChange }) {
  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      Find contact by name
      <input
        style={{
          width: '200px',
          marginTop: '5px',
        }}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
