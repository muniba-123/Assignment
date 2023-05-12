const express = require('express')
const Sequelize = require("sequelize");
const db = require('./models');
const app = express();
const PORT = 3000;
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const cors = require("cors");
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//Following lines are to make sure our app can parse the json data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
db.sequelize.sync()
  .then((result) => {
    
    app.get('/parent', async (req, res) => {
      
      const offset=(req.query.pageSize*req.query.pageNumber)-req.query.pageSize;
      sequelize
      .query(
        `SELECT parents.id,parents.sender,parents.receiver,parents.totalAmount,SUM(children.paidAmount) as totalPaidAmount 
        FROM transactions.parents LEFT JOIN transactions.children ON parents.id=children.parentId GROUP BY parents.id,parents.sender,parents.receiver,parents.totalAmount
        ORDER BY parents.id ${req.query.sort==1?"DESC":"ASC"}
        LIMIT ${req.query.pageSize} OFFSET ${offset} `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then((item) => {
        sequelize
        .query(
          `select count(*) as total from parents;`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((count) => {
          res.send({total:count[0].total,data:item});
        })
      })
      .catch((err) => {
        res.json(err);
      });
      })
      app.get('/child/:id', async (req, res) => {
        sequelize
        .query(
          `SELECT parents.sender,parents.receiver,parents.totalAmount,children.id,children.paidAmount
          FROM transactions.children INNER JOIN transactions.parents ON children.parentId=parents.id
          where children.parentId=${req.params.id}`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((item) => {
          res.send(item);
        })
        .catch((err) => {
          res.json(err);
        });
        })
    app.listen(8000, () => {
      console.log('Server started');
    })
  })
  .catch((err) => {
    console.log(err);
  })