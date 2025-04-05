import React, { useState, FormEvent } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAEOWwZOU5eIae01cVhz2o2BI2U1jMcvgY",
  authDomain: "survey-app-b7e2b.firebaseapp.com",
  projectId: "survey-app-b7e2b",
  storageBucket: "survey-app-b7e2b.firebasestorage.app",
  messagingSenderId: "321835179876",
  appId: "1:321835179876:web:d89f0d1ed5e41f7a15e471"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FormComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formUrl = 'https://script.google.com/macros/s/AKfycbweWb1GN_Bup183xSKmkDkRJurN-PLjtthNyksispJN_P52XXwliSWc7NJhBsB8oCBhcA/exec';
    const params = new URLSearchParams({ name, age });

    // 非同步送出至 Google Script（忽略錯誤）
    fetch(`${formUrl}?${params}`, { method: 'GET', mode: 'no-cors' })
      .catch((err) => {
        console.warn('Google Script 送出失敗（但會繼續）:', err);
      });

    try {
      await addDoc(collection(db, 'survey0405'), { name, age });
      alert('送出成功');
    } catch (error) {
      alert('送出失敗');
    }
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



// import React, { useState, FormEvent } from 'react';

// const FormComponent = () => {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const formUrl = 'https://script.google.com/macros/s/AKfycbweWb1GN_Bup183xSKmkDkRJurN-PLjtthNyksispJN_P52XXwliSWc7NJhBsB8oCBhcA/exec';
//     const params = new URLSearchParams({ name, age });
    
//     fetch(`${formUrl}?${params}`, { method: 'GET', mode: 'no-cors' })
//       .then(() => alert('送出成功'))
//       .catch(() => alert('送出失敗'));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           姓名：
//           <input
//             type="text"
//             value={name}
//             placeholder="姓名"
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           年齡：
//           <input
//             type="text"
//             value={age}
//             placeholder="年齡"
//             onChange={(e) => setAge(e.target.value)}
//           />
//         </label>
//       </div>
//       <button type="submit">確認送出</button>
//     </form>
//   );
// };

// export default FormComponent;
