const restaurantData = {
  _id: {
    $oid: '65f199db759d20ea85ad9b1a',
  },
  name: 'Elisa',
  imageURL: '',
  foodListId: {
    $oid: '65f19b1e759d20ea85ad9b1b',
  },
  usersSubscribed: ['65f175f1ed20e2cc61c6b392'],
};

const foodsListData = {
  _id: {
    $oid: '65f19c67759d20ea85ad9b1d',
  },
  foods: [
    {
      name: 'Cheese',
      restaurantId: {
        $oid: '65f19c5c759d20ea85ad9b1c',
      },
      eaters: ['Brandon'],
      ratings: [],
      notes: [],
    },
  ],
};

const userData = {
  _id: {
    $oid: '65f1591e14d870e1c6ad6c61',
  },
  firstName: 'Brandon',
  email: '7788382328',
  lastName: 'Jung',
  mobile: 'Brandonjung111@gmail.com',
};
