import { ICar } from "../../types/Car";

interface IProps {
  data: [ICar] | any;
}

const Table = ({ data }: IProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Marca</th>
          <th>Name</th>
          <th>Preço</th>
        </tr>
        {data?.map((car: ICar) => (
          <tr key={car.id}>
            <td>{car.brand.name}</td>
            <td>{car.name}</td>
            <td>{car.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
