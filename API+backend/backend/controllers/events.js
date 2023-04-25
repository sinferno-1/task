const eventsTable = require('../models/events')
const createEvent = async (req, res,next)=>{
    const { createdBy, title, desc   } = req.body;
    const newEvent = new eventsTable({
      createdBy,
      title,
      desc,
    });
    try {
    await newEvent.save();
    } catch (err) {
      return next(err) ;
    }
    res.json(newEvent);
}

const readEvent = async (req, res, next) => {
    let allEvents;
    try {
      allEvents = await eventsTable.find({});
    } catch (e) {
      return next(e);
    }
    if (allEvents.length === 0)
      return next(new HttpError("No Events are here currently ", 404));
    res.status(200).json({
      events: allEvents.map((user) => user.toObject()),
    });

}

const cancelEvent = async ( req, res, next)=>{
    const { status } = req.body;
    const eid = req.params.eid;
    let obj ;
    try {
      obj = await eventsTable.findByIdAndUpdate(eid, {
        status: "cancelled"
      });
    } catch (e) {
      return next(e)
    }
    res.status(200).json(obj);
}
const updateEvent = async (req, res, next)=>{
    const { title, desc } = req.body;
    const eid = req.params.eid;
    let obj ;
    try {
      obj= await eventsTable.findById(eid)
    //   console.log(obj)
    } catch (e) {
      return next(e) ;
    }
    try {
      await eventsTable.findByIdAndUpdate(eid, {
        title,
        desc,
      });
    } catch (e) {
      return next(e)
    }
    res.status(200).json(obj);
}
const joinEvent = ()=>{

}

const obj = {createEvent,readEvent,cancelEvent,updateEvent,joinEvent} ;

module.exports = obj ;