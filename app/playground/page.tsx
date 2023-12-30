import type { FC } from "react"

const PageName: FC = ({}) => {
  const data = [
    { name: "Item 1", quantity: 5, price: 10 },
    { name: "Item 2", quantity: 3, price: 15 },
    { name: "Item 3", quantity: 2, price: 8 },
  ]

  return (
    <section className="px-4 sm:container gap-6 pb-4 sm:pb-8 pt-4 sm:pt-6 md:py-10">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default PageName
