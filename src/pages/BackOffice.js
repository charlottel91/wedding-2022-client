import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BackOffice = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  const getUsers = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`);
      setUsers(
        data.map((user) => {
          return {
            id: user.name,
            guests: user.guests.map((guest) => {
              return {
                firstname: guest.firstname,
                lastname: guest.lastname,
                isChild: guest.isChild ? 'oui' : 'non',
                isVegetarian: guest.isVegetarian ? 'oui' : 'non',
                presentBrunch: guest.presentBrunch ? 'oui' : 'non',
              };
            }),
          };
        })
      );
    } catch (err) {
      setError('Une erreur est survenue');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className="table-body"></tbody>
      </table>
    </div>
  );
};

export default BackOffice;
