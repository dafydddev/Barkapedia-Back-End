import db from "../db/connection";
import * as admin from "firebase-admin";
import { UserRequest, User } from "../types/CustomTypes";

const auth = admin.auth();

export const getAllUsers = (): Promise<User[]> => {
  return db
    .collection("users")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as User;
      })
    );
};

export const getUserByID = (user_id: string): Promise<User> => {
  return db
    .collection("users")
    .doc(user_id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const id = snapshot.id;
        const data = snapshot.data();
        return { id, ...data } as User;
      }
      return Promise.reject({
        status: 404,
        msg: `No user found for user_id: ${user_id}`,
      });
    });
};

export const createNewUser = (newUser: UserRequest): Promise<User> => {
  const { email, password, username, type } = newUser;
  const usersRef = db.collection("users");
  return usersRef.get().then((usersSnapshot) => {
    const numUsers = usersSnapshot.size;
    const uid = `user_${numUsers + 1}`;
    return auth
      .createUser({
        email,
        password,
        uid,
      })
      .then(() => {
        const userData = {
          id: uid,
          username,
          email,
          type,
          isVerified: false,
          reviewUpvotes: 0,
        };
        return usersRef
          .doc(uid)
          .set(userData)
          .then(() => {
            return userData as User;
          });
      });
  });
};
