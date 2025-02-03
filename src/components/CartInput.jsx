import { useState } from "react";
function CartInput({ addNewItem }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <section>
      <input
        type="text"
        value={inputValue}
        // input으로 state값 변경하기 -> onChange 이벤트
        // 사용자가 입력필드에 값을 변경할 때 (입력/삭제할때)마다 발생
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            //  추가
            addNewItem(inputValue);
            setInputValue("");
          }
        }}
      >
        추가
      </button>
    </section>
  );
}
export default CartInput;
