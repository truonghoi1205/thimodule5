import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as productService from "../../services/ProductService";
import * as categoryService from "../../services/CategoryService";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  sku: Yup.string()
    .required("Mã sản phẩm bắt buộc")
    .matches(
      /^PROD-\d{4}$/,
      "Mã sản phẩm phải có dạng PROD-XXXX với X là các số"
    ),
  name: Yup.string()
    .required("Tên bắt buộc")
    .min(3, "Tên không được ngắn hơn 3 ký tự"),
  quantity: Yup.number()
    .required("Số lượng bắt buộc")
    .min(0, "Số lượng phải lớn hơn 0"),
  price: Yup.number().required("Giá bắt buộc").min(0, "Giá phải lớn hơn 0"),
  date: Yup.date()
    .required("Ngày bắt buộc")
    .max(new Date(), "Ngày không được lớn hơn ngày hiện tại"),
  categoryId: Yup.number().required("Thể loại bắt buộc"),
});

function Create() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await categoryService.getAllCategories();
        setCategories(categoryData);
      } catch (error) {
        toast.error("Không thể tải dữ liệu.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await productService.saveProduct(values);
      if (response) {
        toast.success("Thêm mới thành công");
        navigate("/products");
      } else {
        toast.error("Thêm mới thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình xử lý.");
    }
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Formik
      initialValues={{
        sku: "",
        name: "",
        quantity: 0,
        price: 0,
        date: "",
        description: "",
        categoryId: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="container w-50 mt-5 shadow-sm p-3"
        >
          <h2 className="mb-3">Thêm mới sản phẩm</h2>
          <div className="mb-3">
            <label className="form-label">Mã sản phẩm</label>
            <Field name="sku" className="form-control form-control-sm" />
            <ErrorMessage className="text-danger" name="sku" component="p" />
          </div>
          <div className="mb-3">
            <label className="form-label">Tên</label>
            <Field name="name" className="form-control form-control-sm" />
            <ErrorMessage className="text-danger" name="name" component="p" />
          </div>
          <div className="mb-3">
            <label className="form-label">Thể loại</label>
            <Select
              options={categoryOptions}
              onChange={(option) =>
                formik.setFieldValue("categoryId", option?.value || "")
              }
              value={categoryOptions.find(
                (c) => c.value === formik.values.categoryId
              )}
              placeholder="Chọn thể loại"
            />
            <ErrorMessage
              className="text-danger"
              name="categoryId"
              component="p"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Giá</label>
            <Field
              type="number"
              name="price"
              className="form-control form-control-sm"
            />
            <ErrorMessage className="text-danger" name="price" component="p" />
          </div>
          <div className="mb-3">
            <label className="form-label">Số lượng</label>
            <Field
              type="number"
              name="quantity"
              className="form-control form-control-sm"
            />
            <ErrorMessage
              className="text-danger"
              name="quantity"
              component="p"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày nhập sản phẩm</label>
            <Field
              type="date"
              name="date"
              className="form-control form-control-sm"
            />
            <ErrorMessage className="text-danger" name="date" component="p" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <Field
              as="textarea"
              name="description"
              className="form-control form-control-sm"
              rows="3"
            />
            <ErrorMessage
              className="text-danger"
              name="description"
              component="p"
            />
          </div>

          <div className="text-end">
            <Link className="btn btn-sm btn-secondary me-2" to="/products">
              Quay lại
            </Link>
            <button className="btn btn-sm btn-primary" type="submit">
              Thêm mới
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Create;
