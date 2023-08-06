import "../styles/Table.css";

const Table = ({ data }) => {
  return (
    <div class="tableFixHead">
      <table>
        <tbody>
          <div>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
              </tr>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
