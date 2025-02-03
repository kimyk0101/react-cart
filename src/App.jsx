import { useState, useEffect } from "react";

import CartHeader from "./components/CartHeader.jsx";
import ShopList from "./components/ShopList.jsx";
import CartInput from "./components/Cartinput.jsx";
import BoughtList from "./components/BoughtList.jsx";
import CartFooter from "./components/CartFooter.jsx";

function App() {
  //  서버로부터 API 호출해서 쇼핑 목록 받아오기
  const apiUrl = "http://localhost:8088/api/shoplist";

  // const [itemList, setItemList] = useState([
  //   { id: 1, name: "무", isBought: false },
  //   { id: 2, name: "배추", isBought: false },
  //   { id: 3, name: "쪽파", isBought: true },
  //   { id: 4, name: "고춧가루", isBought: false },
  // ]);
  const [itemList, setItemList] = useState([]);

  //  산 물건 보기 여부를 체크할 state
  const [showBoughtItems, setShowBoughtItems] = useState(true);

  //  페이지 로딩 상태 체크 state
  const [isLoading, setIsLoading] = useState(true);
  //  에러 메시지 출력을 위한 state
  const [error, setError] = useState(null);

  //  isBought === false인 것만 필터링
  const shopItems = itemList.filter((item) => !item.isBought); //  isBought가 false인 것들(!으로 논리값 뒤집기)

  // isBought === true인 목록
  const boughtItems = itemList.filter((item) => item.isBought);

  //  API에서 목록 받아오는 함수
  const fetchItems = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      // console.log(data);
      setItemList(data);
      setIsLoading(false); //  로딩이 끝났음을 알림
    } catch (err) {
      // console.error(err);
      setError(err.message);
      setIsLoading(false); //  로딩이 끝남
    }
  };
  // 서버와의 통신
  useEffect(() => {
    fetchItems();
  }, []); //  컴포넌트가 처음 로딩되었을 때의 이펙트 발생

  if (isLoading) return <div>로딩 중...</div>; //  return -> 더 이상(밑으로) 실행되지 않고 나감
  if (error) return <div>에러: {error}</div>;

  //  새 아이템 추가
  const addNewItem = async (name) => {
    //  async가 있어야
    //  id 생성 -> id의 최댓값 +1
    const newId =
      itemList.length > 0
        ? Math.max(...itemList.map((item) => item.id)) + 1
        : 1;

    //  객체 생성
    //  ES6 -> 속성이 키 이름과 값 이름이 같을 때 줄여 쓸 수 있다
    // name: name => name
    const newItem = { id: newId, name, isBought: false };

    //  itemList에 새 아이템 추가 (setItemList(newItemList))
    // const newItemList = [...itemList, newItem];
    // setItemList(newItemList);

    //  -> REST 서버에 POST 호출 -> CREATE
    try {
      const response = await fetch(apiUrl, {
        //  await가 호출(비동기 방식을 동기 방식으로 처리)
        method: "POST",
        headers: {
          "Content-Type": "application/json", //  전달받은 데이터의 데이터 타입 -> 기본형식/데이터 타입
        },
        body: JSON.stringify(newItem), //  문서로서의 JSON
      });
      //  요청 결과 확인
      if (!response.ok) {
        throw new Error("새 아이템을 추가하지 못했습니다.");
      }
      //  리스트 갱신
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };
  //  id -> isBought를 true <-> false
  const toggleBought = async (id) => {
    /*
    const newItemList = itemList.map((item) =>
      item.id === id ? { ...item, isBought: !item.isBought } : item
    );
    setItemList(newItemList);
    */

    //  id로 아이템을 찾아서
    //  해당 아이템의 isBought 값을 반전 true <-> false
    const updatedItem = itemList.find((item) => item.id === id);
    updatedItem.isBought = !updatedItem.isBought;

    //  서버에 UPDATE 요청 전송
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error("데이터를 수정하지 못했습니다.");
      }
      fetchItems();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  //  id -> item 삭제
  const deleteItem = async (id) => {
    // const newItemList = itemList.filter((item) => item.id !== id);
    // setItemList(newItemList);

    //  DELETE method로 요청
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("아이템을 삭제하지 못했습니다.");
      }
      //  목록 갱신
      fetchItems();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <CartHeader />
      <main>
        <section>
          <h2>전체 목록</h2>
          <ul>
            {itemList.map((item) => (
              <li key={item.id}>{item.name}</li> //  key값이 없거나 중복되면 랜더링 할 때 어떤 사항이 변경되었는지 모르기 때문에 key값 필요
            ))}
          </ul>
        </section>

        <ShopList
          items={shopItems}
          toggleBought={toggleBought}
          deleteItem={deleteItem}
        />
        <CartInput addNewItem={addNewItem} />
        <input
          type="checkbox"
          id="show-bougt-items"
          checked={showBoughtItems}
          onChange={(event) => setShowBoughtItems(event.target.checked)}
        />
        <label>산 물건 보기</label>
        {/* 선택적 랜더링 (if문 등 쓸 수 없음)*/}
        {showBoughtItems && (
          <BoughtList items={boughtItems} toggleBought={toggleBought} />
        )}
      </main>
      <CartFooter />
    </div>
  );
}

export default App;
