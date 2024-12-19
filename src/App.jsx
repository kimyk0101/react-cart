import { useState } from "react";
import CartHeader from "./components/CartHeader.jsx";
import ShopList from "./components/ShopList.jsx";
import CartInput from "./components/Cartinput.jsx";
import BoughtList from "./components/BoughtList.jsx";
import CartFooter from "./components/CartFooter.jsx";

function App() {
  const [itemList, setItemList] = useState([
    { id: 1, name: "무", isBought: false },
    { id: 2, name: "배추", isBought: false },
    { id: 3, name: "쪽파", isBought: true },
    { id: 4, name: "고춧가루", isBought: false },
  ]);

  //  산 물건 보기 여부를 체크할 state
  const [showBoughtItems, setShowBoughtItems] = useState(true);

  //  isBought === false인 것만 필터링
  const shopItems = itemList.filter((item) => !item.isBought); //  isBought가 false인 것들(!으로 논리값 뒤집기)

  //  새 아이템 추가
  const addNewItem = (name) => {
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
    const newItemList = [...itemList, newItem];
    setItemList(newItemList);
  };
  //  id -> isBought를 true <-> false
  const toggleBought = (id) => {
    const newItemList = itemList.map((item) =>
      item.id === id ? { ...item, isBought: !item.isBought } : item
    );
    setItemList(newItemList);
  };

  //  id -> item 삭제
  const deleteItem = (id) => {
    const newItemList = itemList.filter((item) => item.id !== id);
    setItemList(newItemList);
  };

  // isBought === true인 목록
  const boughtItems = itemList.filter((item) => item.isBought);

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
