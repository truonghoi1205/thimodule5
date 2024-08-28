import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as productService from "../../services/ProductService";
import * as categoryService from "../../services/CategoryService";
import "bootstrap/dist/css/bootstrap.min.css";
import Common from "../helper/Common";
import Select from "react-select";

const List = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (e) {
        toast.error("Không thể tải danh mục.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(
          name,
          selectedCategory?.value || ""
        );
        setProducts(data);
      } catch (error) {
        toast.error("Không thể tải sản phẩm.");
      }
    };
    fetchProducts();
  }, [name, selectedCategory]);

  const categoryOptions = [
    { value: "", label: "Chọn thể loại" },
    ...categories.map((c) => ({
      value: c.id,
      label: c.name,
    })),
  ];
  return (
    <div className="container rounded shadow-sm p-3 mt-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="m-0">Danh sách sản phẩm</h3>
        <Link className="btn btn-sm btn-primary mt-3" to="/create">
          Thêm mới
        </Link>
      </div>
      <input
        className="form-control form-control w-25"
        placeholder="Nhập tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="mt-2 d-flex align-items-center">
        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={(option) => setSelectedCategory(option)}
          placeholder="Chọn thể loại"
          styles={{
            container: (provided) => ({
              ...provided,
              width: "160px",
              fontSize: "0.850rem",
            }),
          }}
        />
      </div>
      {products.length === 0 ? (
        <p className="text-danger text-center mt-3">Không tìm thấy sản phẩm nào!</p>
      ) : (
        <Table className="table table-hover table-bordered mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Thể Loại</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Ngày nhập</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>{p.category.name}</td>
                <td>{p.quantity}</td>
                <td>{Common.formatPrice(p.price)}</td>
                <td>{Common.formatDateVi(p.date)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );  
};

export default List;
