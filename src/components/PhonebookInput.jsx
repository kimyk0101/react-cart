import { useState } from "react";

function PhonebookForm({ addContact }) {
  const [inputName, setInputName] = useState("");
  const [inputHp, setInputHp] = useState("");
  const [inputTel, setInputTel] = useState("");

  return (
    <div className="container">
      <h1>전화번호부</h1>
      <input
        className="input-box"
        type="text"
        placeholder="name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="hp"
        value={inputHp}
        onChange={(e) => setInputHp(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="tel"
        value={inputTel}
        onChange={(e) => setInputTel(e.target.value)}
      />
      <button
        className="input-button"
        onClick={() => {
          if (
            inputName.trim() !== "" &&
            inputHp.trim() !== "" &&
            inputTel.trim() !== ""
          ) {
            //  추가
            addContact(inputName, inputHp, inputTel);
            setInputName("");
            setInputHp("");
            setInputTel("");
          }
        }}
      >
        전화번호 추가
      </button>
    </div>
  );
}

export default PhonebookForm;
