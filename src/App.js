import { useState } from "react";
import "./App.css";
import dogCat from "./dogcat.webp";
import Form from "react-bootstrap/Form";

function App() {
  const [listInput, setListInput] = useState(["", ""]); // Mỗi ô input sẽ tương ứng với 1 giá trị trong listInput
  const [listError, setListError] = useState(["", ""]); // Mỗi ô input sẽ tương ứng với 1 lỗi (nếu có)
  const [select, setSelect] = useState(""); // State để lưu giá trị được chọn từ Form.Select
  const [selectError, setSelectError] = useState(""); // State để lưu lỗi của Form.Select
  const [error, setError] = useState(""); // State để lưu thông báo lỗi chung

  // Hàm thêm input
  const handleAddInput = () => {
    setError(""); // Xóa thông báo lỗi nếu có
    setListInput([...listInput, ""]); // Thêm giá trị rỗng vào cuối danh sách
    setListError([...listError, ""]); // Thêm giá trị lỗi rỗng vào cuối danh sách
  };

  // Hàm xóa input
  const handleDeleteInput = () => {
    if (listInput.length <= 2) {
      setError("Cần ít nhất 2 triệu chứng!"); // Hiển thị lỗi nếu ít hơn 2 phần tử
      return;
    }
    setError(""); // Xóa thông báo lỗi nếu hợp lệ
    setListInput(listInput.slice(0, -1)); // Xóa phần tử cuối cùng trong danh sách
    setListError(listError.slice(0, -1)); // Xóa lỗi tương ứng
  };

  // Hàm xử lý thay đổi giá trị input
  const handleInputChange = (value, index) => {
    const updatedList = [...listInput];
    const updatedErrors = [...listError];
    updatedList[index] = value; // Cập nhật giá trị tại vị trí tương ứng

    // Xóa lỗi nếu ô input được nhập
    if (value.trim() !== "") {
      updatedErrors[index] = "";
    }

    setListInput(updatedList);
    setListError(updatedErrors);
  };

  // Hàm xử lý thay đổi giá trị của Form.Select
  const handleSelectChange = (value) => {
    setSelect(value);

    // Xóa lỗi nếu giá trị hợp lệ được chọn
    if (value.trim() !== "") {
      setSelectError("");
    }
  };

  // Kiểm tra lỗi trước khi submit
  const handleSubmit = () => {
    const updatedErrors = [...listError];
    let hasError = false;

    // Kiểm tra các ô input
    listInput.forEach((item, index) => {
      if (item.trim() === "") {
        updatedErrors[index] = "Triệu chứng không được để trống";
        hasError = true;
      }
    });

    setListError(updatedErrors);

    // Kiểm tra Form.Select
    if (select.trim() === "") {
      setSelectError("Vui lòng chọn loại thú cưng");
      hasError = true;
    }

    // Nếu không có lỗi, thực hiện submit
    if (!hasError) {
      console.log("Loại thú cưng:", select);
      console.log("Danh sách triệu chứng:", listInput);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="introduction">
          <div className="text">
            <div className="text-child">Pet</div>
            <div className="text-child">Care</div>
          </div>
          <img src={dogCat} alt="img" className="dogCat" />
        </div>
        <div className="action">
          <div className="col-6 option">
            {/* Dropdown Form.Select */}
            <Form.Select
              aria-label="Default select example"
              className="list-option"
              value={select} // Liên kết giá trị từ state `select`
              onChange={(e) => handleSelectChange(e.target.value)} // Cập nhật state khi thay đổi
            >
              <option value="">Open this select menu</option>
              <option value="Dog">Chó</option>
              <option value="Cat">Mèo</option>
              <option value="Hamster">Chuột hamster</option>
            </Form.Select>
            {/* Hiển thị lỗi của Form.Select */}
            {selectError && <div className="text-danger">{selectError}</div>}
            <hr />

            {/* Render danh sách các input */}
            {listInput.map((item, index) => {
              return (
                <Form.Group
                  key={index} // Đặt key để React quản lý
                  className="mb-3"
                  controlId={`formBasicEmail-${index}`}
                >
                  <Form.Label>{`Triệu chứng ${index + 1}`}</Form.Label>
                  <Form.Control
                    type="text"
                    value={item} // Liên kết giá trị từ listInput
                    placeholder={`Triệu chứng ${index + 1}`}
                    onChange={(e) => handleInputChange(e.target.value, index)} // Cập nhật state khi thay đổi
                  />
                  {/* Hiển thị lỗi nếu có */}
                  {listError[index] && (
                    <div className="text-danger">{listError[index]}</div>
                  )}
                </Form.Group>
              );
            })}

            {/* Hiển thị thông báo lỗi chung */}
            {error && <div className="error text-danger">{error}</div>}

            {/* Các nút thao tác */}
            <div className="list-button">
              <button className="btn btn-them" onClick={handleAddInput}>
                Thêm triệu chứng
              </button>
              <button
                className="btn btn-xoa"
                onClick={handleDeleteInput}
                disabled={listInput.length === 0} // Không cho xóa nếu không còn input
              >
                Xóa triệu chứng
              </button>
              <button className="btn btn-confirm" onClick={handleSubmit}>
                Xác nhận
              </button>
            </div>
          </div>
          <div className="col-6 info">
            <div className="info-child">
              <div className="title">Tên bệnh</div>
              <div className="description">
                thấy trong cái bảng có căn lăn là sao rồi ảnh thì saocái chó mèo
                t thấy có cái mũi tên sún là gì triệu chứng bấm vô đc ko nút
                không có chữ bấm vô đc j nút xác nhận bấm vô đx j bảng bên cạnh
                khi nào xuất hiện thấy trong cái bảng có căn lăn là sao rồi ảnh
                thì sao
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
