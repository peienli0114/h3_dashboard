import React, { useState, FormEvent } from 'react';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formUrl = 'https://script.google.com/macros/s/AKfycbweWb1GN_Bup183xSKmkDkRJurN-PLjtthNyksispJN_P52XXwliSWc7NJhBsB8oCBhcA/exec';
    const params = new URLSearchParams({ name, age });
    
    fetch(`${formUrl}?${params}`, { method: 'GET', mode: 'no-cors' })
      .then(() => alert('送出成功'))
      .catch(() => alert('送出失敗'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          姓名：
          <input
            type="text"
            value={name}
            placeholder="姓名"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          年齡：
          <input
            type="text"
            value={age}
            placeholder="年齡"
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">確認送出</button>
    </form>
  );
};

export default FormComponent;
