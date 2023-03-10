import { User } from '@prisma/client';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import hashPassword from '../../auth/utils/hashPassword';
import prisma from '../../core/config/client';
import USER_NOT_FOUND from '../../core/types/userNotFound';

const findById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const updatePassword = async (
  id: string,
  password: string
): Promise<User | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashPassword(password),
      },
    });
    return updatedUser;
  } catch (error: any) {
    if (error instanceof PrismaClientUnknownRequestError) {
      throw USER_NOT_FOUND;
    }
    throw error;
  }
};

const updateName = async (
  id: string,
  firstName: string,
  lastName: string
): Promise<User | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });
    return updatedUser;
  } catch (error: any) {
    if (error instanceof PrismaClientUnknownRequestError) {
      throw USER_NOT_FOUND;
    }
    throw error;
  }
};

export default {
  findById,
  findByEmail,
  updatePassword,
  updateName,
};