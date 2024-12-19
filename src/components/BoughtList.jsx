function BoughtList({ items }) {
  return (
    <div>
      <h2>산 물건들</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button>취소</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoughtList;
