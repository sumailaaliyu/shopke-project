import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import './productform.css'

function ProductForm({ products, setProducts }) {
  const { storeId, productId } = useParams()
  const navigate = useNavigate()

  const existing = products.find((p) => String(p.id) === productId)
  const editing = Boolean(existing)

  const [values, setValues] = useState({
    name: existing?.name ?? '',
    description: existing?.description ?? '',
    price: existing?.price ?? '',
    stock: existing?.stock ?? '',
    category: existing?.category ?? '',
  })
  const [file, setFile] = useState(null)
  const [blobUrl, setBlobUrl] = useState('')
  const [errors, setErrors] = useState({})
  const fileRef = useRef(null)

  // The preview is the new image if one was chosen, otherwise the saved one
  const preview = blobUrl || existing?.image || ''

  // Free the memory used by the preview when it changes or the page closes
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  const handleFile = (e) => {
    const chosen = e.target.files[0]
    if (!chosen) return
    setFile(chosen)
    setBlobUrl(URL.createObjectURL(chosen))
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const save = (image) => {
    const product = {
      name: values.name.trim(),
      description: values.description.trim(),
      category: values.category.trim() || 'General',
      price: Number(values.price),
      stock: Number(values.stock),
      image,
    }

    if (editing) {
      setProducts(
        products.map((p) => (p.id === existing.id ? { ...p, ...product } : p))
      )
    } else {
      setProducts([...products, { ...product, id: Date.now() }])
    }
    navigate(`/s/${storeId}/products`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = {}
    if (!values.name.trim()) {
      found.name = 'Enter a product name.'
    }
    if (!(Number(values.price) > 0)) {
      found.price = 'Price must be a number above 0.'
    }
    if (!/^\d+$/.test(String(values.stock))) {
      found.stock = 'Stock must be a whole number.'
    }
    setErrors(found)
    if (Object.keys(found).length > 0) return

    if (file) {
      // The preview link is temporary, so save the image itself
      const reader = new FileReader()
      reader.onload = () => save(reader.result)
      reader.readAsDataURL(file)
    } else {
      save(existing?.image || '')
    }
  }

  if (productId && !existing) {
    return (
      <DashboardLayout title="Edit product">
        <p>We could not find that product.</p>
        <Link to={`/s/${storeId}/products`}>Back to products</Link>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title={editing ? 'Edit product' : 'Add product'}>
      <form className="pf" onSubmit={handleSubmit} noValidate>
        <Card>
          <Input
            id="name"
            name="name"
            label="Product name"
            placeholder="e.g. Ankara tote bag"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            id="description"
            name="description"
            label="Description"
            multiline
            placeholder="Describe your product"
            value={values.description}
            onChange={handleChange}
          />
          <div className="pf-pair">
            <Input
              id="price"
              name="price"
              label="Price (NGN)"
              inputMode="decimal"
              placeholder="0.00"
              value={values.price}
              onChange={handleChange}
              error={errors.price}
            />
            <Input
              id="stock"
              name="stock"
              label="Stock quantity"
              inputMode="numeric"
              placeholder="0"
              value={values.stock}
              onChange={handleChange}
              error={errors.stock}
            />
          </div>
          <Input
            id="category"
            name="category"
            label="Category"
            list="category-options"
            placeholder="Choose or type a category"
            value={values.category}
            onChange={handleChange}
          />
          <datalist id="category-options">
            {[...new Set(products.map((p) => p.category))].map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Card>

        <Card>
          <strong>Photos</strong>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
          <button
            type="button"
            className="pf-drop"
            style={{ backgroundImage: preview ? `url(${preview})` : 'none' }}
            onClick={() => fileRef.current.click()}
          >
            {!preview && 'Click to upload photos'}
          </button>
          <Button type="submit" full>Save product</Button>
          <p className="pf-cancel">
            <Link to={`/s/${storeId}/products`}>Cancel</Link>
          </p>
        </Card>
      </form>
    </DashboardLayout>
  )
}

export default ProductForm