
import { Schema, model, Document, Types } from 'mongoose';

// Profile Document Interface
export interface IProfile extends Document {
  userId: Types.ObjectId;
  name: string;
  age?: number;
  gender?: string;
  bio?: string;
  education?: string;
  occupation?: string;
  height?: string;
  interests?: string[];
  religion?: string;
  location?: string;
  photos?: string[];
  completionPercentage?: number;
  updatedAt: Date;
  createdAt: Date;
}

// Profile Schema
const profileSchema = new Schema<IProfile>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    age: { 
      type: Number,
      min: 18,
      max: 120
    },
    gender: { 
      type: String 
    },
    bio: { 
      type: String 
    },
    education: { 
      type: String 
    },
    occupation: { 
      type: String 
    },
    height: { 
      type: String 
    },
    interests: [{ 
      type: String 
    }],
    religion: { 
      type: String 
    },
    location: { 
      type: String 
    },
    photos: [{ 
      type: String 
    }],
    completionPercentage: { 
      type: Number, 
      default: 0 
    }
  },
  { 
    timestamps: true 
  }
);

// Create Profile model
export const ProfileModel = model<IProfile>('Profile', profileSchema);
