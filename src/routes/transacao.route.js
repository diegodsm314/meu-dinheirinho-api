const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const { TransactionController } = require("../controllers");
const cors = require("cors");


const corsoptions = {
  origin: "*",
  methods: ['GET', 'POST', 'OPTIONS', 'ORDER'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/novo", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.post("/novo", cors(corsoptions), TransactionController.novo)
router.options("/get", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.get("/get", cors(corsoptions), TransactionController.get)

module.exports.transacao = router;