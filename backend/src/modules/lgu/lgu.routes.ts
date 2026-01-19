import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LGU from './lgu.model.ts';
const router = express.Router();

// Login route
router.post('/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const user = await LGU.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
