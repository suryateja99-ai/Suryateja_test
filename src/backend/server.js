import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authMiddleware from './middleware/authMiddleware.js';


const app = express()
app.use(cors())
app.use(express.json())

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Connection established'))
.catch((error)=>console.log('connection error', error))

const bookingSchema = new mongoose.Schema({
    name:{type: String, required:true},
    time:{type: String, required:true},
    date:{type: String, required:true},
    sport:{type: String, required:true},
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)


app.post('/booking',authMiddleware,async(req,res)=>{
    try{
      const{sport, date, time}=req.body;
      const existingBooking = await Booking.findOne({
        sport, date, time
      })
      if(existingBooking){
        res.status(409).json({
          message:'Slot Not Available'
        })
      }
        const book = await Booking.create(req.body)
        console.log('connection successful')
        res.status(201).json(book)
        
    }catch(err){
        res.status(404).json({message:'error occured',content:err})
    }
})

app.get('/booked-slots', async (req, res) => {
  try {
    const { sport, date } = req.query;

    const bookings = await Booking.find({ sport, date });
    const bookedSlots = bookings.map(b => b.time);

    res.json(bookedSlots);
  } catch {
    res.status(500).json({ message: 'Error fetching slots' });
  }
});


const userSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const Users = mongoose.model('Users',userSchema)

app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const existingEmail= await Users.findOne({email})
    if(existingEmail){
      res.status(409).json({message:'email already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Registration failed',
      error: err.message
    });
  }
});

app.post('/login',async(req,res)=>{
try{
  const {email,password}=req.body

if (!email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

const user = await Users.findOne({email});
if(!user){
  res.status(401).json({message:'missing credentials'})
}

const ismatch = await bcrypt.compare(password, user.password);

if(!ismatch){
  res.status(401).json({message:'invalid credentials'})
}

const token = jwt.sign(
  {user:user._id},
  process.env.JWT_SECRET,
  {expiresIn:'1h'}
);

res.json({message:'login success', token, user:{name: user.email}})
}catch(err){
  res.status(401).json({message:'error in login', content:err})
}
})
const port=5000
app.listen(port,()=>{
    console.log('Server running')
})