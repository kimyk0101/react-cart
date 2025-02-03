import { useState } from "react";

function PhonebookList({ contacts, updateContact, deleteContact }) {
  const [editModes, setEditModes] = useState({});
  const [editValues, setEditValues] = useState({});
  return (
    <div className="container">
      <table>
        {/* 테이블 태그 사용 */}
        <thead>
          <tr>
            <th>이름</th>
            <th>휴대폰 번호</th>
            <th>전화번호</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                {editModes[contact.id] ? ( // 수정 모드인 경우
                  <input
                    type="text"
                    value={editValues[contact.id]?.name || contact.name} // 수정 값 state 사용
                    onChange={(e) => {
                      setEditValues({
                        ...editValues,
                        [contact.id]: {
                          ...editValues[contact.id],
                          name: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  // 일반 모드인 경우
                  <span>{contact.name}</span>
                )}
              </td>
              <td>
                {editModes[contact.id] ? ( // 수정 모드인 경우
                  <input
                    type="text"
                    value={editValues[contact.id]?.hp || contact.hp} // 수정 값 state 사용
                    onChange={(e) => {
                      setEditValues({
                        ...editValues,
                        [contact.id]: {
                          ...editValues[contact.id],
                          hp: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  // 일반 모드인 경우
                  <span>{contact.hp}</span>
                )}
              </td>
              <td>
                {editModes[contact.id] ? ( // 수정 모드인 경우
                  <input
                    type="text"
                    value={editValues[contact.id]?.tel || contact.tel} // 수정 값 state 사용
                    onChange={(e) => {
                      setEditValues({
                        ...editValues,
                        [contact.id]: {
                          ...editValues[contact.id],
                          tel: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  // 일반 모드인 경우
                  <span>{contact.tel}</span>
                )}
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => {
                    setEditModes({ ...editModes, [contact.id]: true }); // 수정 모드 활성화
                    setEditValues({
                      ...editValues,
                      [contact.id]: { ...contact },
                    }); // 수정 값 state 초기화
                  }}
                >
                  수정
                </button>
                <button
                  className="update-button"
                  onClick={() => {
                    updateContact(contact.id, editValues[contact.id]);
                    setEditModes({ ...editModes, [contact.id]: false });
                  }}
                >
                  저장
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteContact(contact.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PhonebookList;
