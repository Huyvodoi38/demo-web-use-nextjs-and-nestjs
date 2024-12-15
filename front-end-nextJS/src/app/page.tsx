'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [sumResult, setSumResult] = useState(null); // Trạng thái để lưu kết quả tổng
  const [echoedText, setEchoedText] = useState(null); // Trạng thái để lưu văn bản đã echo
  const [inputA, setInputA] = useState(''); // Trạng thái cho số A
  const [inputB, setInputB] = useState(''); // Trạng thái cho số B
  const [textInput, setTextInput] = useState(''); // Trạng thái cho văn bản nhập vào

  // Hàm để lấy tổng của hai số từ API
  const fetchSum = async () => {
    const res = await axios.get(`http://localhost:3001/sum?a=${inputA}&b=${inputB}`);
    setSumResult(res.data.sum); // Cập nhật kết quả tổng vào trạng thái
  };

  // Hàm để gửi và nhận lại văn bản từ API
  const fetchEcho = async () => {
    const res = await axios.post('http://localhost:3001/echo', { text: textInput });
    setEchoedText(res.data.echoedText); // Cập nhật văn bản echo vào trạng thái
  };

  return (
    <div>
      <h1>Simple Web API with Next.js and NestJS</h1>

      <section>
        <h2>Hello API</h2>
        <a href="http://localhost:3001/hello" target="_blank">Say Hello</a>
        {/* Liên kết đến API "hello" */}
      </section>

      <section>
        <h2>Dog Image</h2>
        <a href="http://localhost:3001/dog" target="_blank">Get Dog Image</a>
        {/* Liên kết đến API trả về hình ảnh chó */}
      </section>

      <section>
        <h2>Cat Image</h2>
        <a href="http://localhost:3001/cat" target="_blank">Get Cat Image</a>
        {/* Liên kết đến API trả về hình ảnh mèo */}
      </section>

      <section>
        <h2>Sum Calculator</h2>
        <input
          type="number"
          placeholder="Number A"
          value={inputA}
          onChange={(e) => setInputA(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number B"
          value={inputB}
          onChange={(e) => setInputB(e.target.value)}
        />
        <button onClick={fetchSum}>Get Sum</button>
        {sumResult !== null && <p>Sum: {sumResult}</p>}
        {/* Trường nhập liệu và nút để tính tổng */}
      </section>

      <section>
        <h2>Echo Text</h2>
        <input
          type="text"
          placeholder="Type something"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={fetchEcho}>Echo</button>
        {echoedText && <p>Echoed: {echoedText}</p>}
        {/* Trường nhập liệu và nút để echo văn bản */}
      </section>
    </div>
  );
}
