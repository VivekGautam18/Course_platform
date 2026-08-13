// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// import {
//   User,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   sendEmailVerification,
//   signOut,
// } from "firebase/auth";

// import {
//   doc,
//   getDoc,
//   setDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// import { auth, db } from "../firebase/firebase";

// export interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: "student" | "admin";
//   attempt?: string;
//   college?: string;
//   preparationLevel?: string;
// }

// interface AuthContextType {
//   user: UserData | null;
//   firebaseUser: User | null;

//   loading: boolean;

//   isAuthenticated: boolean;

//   isAdmin: boolean;

//   login: (
//     email: string,
//     password: string
//   ) => Promise<{
//     success: boolean;
//     message: string;
//   }>;

//   register: (
//     name: string,
//     email: string,
//     phone: string,
//     password: string
//   ) => Promise<{
//     success: boolean;
//     message: string;
//   }>;

//   logout: () => Promise<void>;

//   forgotPassword: (
//     email: string
//   ) => Promise<{
//     success: boolean;
//     message: string;
//   }>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// interface Props {
//   children: ReactNode;
// }

// export const AuthProvider = ({
//   children,
// }: Props) => {

//   const [user, setUser] =
//     useState<UserData | null>(null);

//   const [firebaseUser, setFirebaseUser] =
//     useState<User | null>(null);

//   const [loading, setLoading] =
//     useState(true);
//   const register = async (
//     name: string,
//     email: string,
//     phone: string,
//     password: string
//   ) => {
//     try {
//       const credential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await sendEmailVerification(credential.user);

//       const userData: UserData = {
//         id: credential.user.uid,
//         name,
//         email,
//         phone,
//         role: "student",
//       };

//       await setDoc(
//         doc(db, "users", credential.user.uid),
//         {
//           ...userData,
//           createdAt: serverTimestamp(),
//         }
//       );

//       return {
//         success: true,
//         message:
//           "Registration successful. Please verify your email before logging in.",
//       };
//     } catch (error: any) {
//       let message = "Registration failed.";

//       switch (error.code) {
//         case "auth/email-already-in-use":
//           message = "Email already exists.";
//           break;

//         case "auth/invalid-email":
//           message = "Invalid email address.";
//           break;

//         case "auth/weak-password":
//           message = "Password should be at least 6 characters.";
//           break;
//       }

//       return {
//         success: false,
//         message,
//       };
//     }
//   };

//   const login = async (
//     email: string,
//     password: string
//   ) => {
//     try {
//       const credential =
//         await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//       if (!credential.user.emailVerified) {
//         await signOut(auth);

//         return {
//           success: false,
//           message:
//             "Please verify your email before logging in.",
//         };
//       }

//       return {
//         success: true,
//         message: "Login successful.",
//       };
//     } catch (error: any) {
//       let message = "Invalid email or password.";

//       switch (error.code) {
//         case "auth/user-not-found":
//           message = "User not found.";
//           break;

//         case "auth/wrong-password":
//           message = "Wrong password.";
//           break;

//         case "auth/too-many-requests":
//           message =
//             "Too many failed attempts. Try again later.";
//           break;
//       }

//       return {
//         success: false,
//         message,
//       };
//     }
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   const forgotPassword = async (
//     email: string
//   ) => {
//     try {
//       await sendPasswordResetEmail(auth, email);

//       return {
//         success: true,
//         message:
//           "Password reset email sent successfully.",
//       };
//     } catch {
//       return {
//         success: false,
//         message:
//           "Unable to send password reset email.",
//       };
//     }
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setFirebaseUser(firebaseUser);

//         try {
//           const userDoc = await getDoc(
//             doc(db, "users", firebaseUser.uid)
//           );

//           if (userDoc.exists()) {
//             setUser(userDoc.data() as UserData);
//           } else {
//             setUser(null);
//           }
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           setUser(null);
//         }
//       } else {
//         setFirebaseUser(null);
//         setUser(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const value: AuthContextType = {
//     user,
//     firebaseUser,
//     loading,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === "admin",

//     login,
//     register,
//     logout,
//     forgotPassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );

// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useAuth must be used within an AuthProvider"
//     );
//   }

//   return context;
// };
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "student" | "admin";
  attempt?: string;
  college?: string;
  preparationLevel?: string;
  // Course IDs this student has actually paid for. This lives on the
  // user's own Firestore doc (not localStorage) so access is tied to the
  // logged-in account and can't be shared across browsers/users.
  purchasedCourseIds?: string[];
}

interface AuthContextType {
  user: UserData | null;
  firebaseUser: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  isAdmin: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  logout: () => Promise<void>;

  forgotPassword: (
    email: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  updateProfile: (
    data: Partial<Pick<UserData, "name" | "phone" | "attempt" | "college" | "preparationLevel">>
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: Props) => {

  const [user, setUser] =
    useState<UserData | null>(null);

  const [firebaseUser, setFirebaseUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);
  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(credential.user);

      const userData: UserData = {
        id: credential.user.uid,
        name,
        email,
        phone,
        role: "student",
      };

      await setDoc(
        doc(db, "users", credential.user.uid),
        {
          ...userData,
          createdAt: serverTimestamp(),
        }
      );

      return {
        success: true,
        message:
          "Registration successful. Please verify your email before logging in.",
      };
    } catch (error: any) {
      let message = "Registration failed.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Email already exists.";
          break;

        case "auth/invalid-email":
          message = "Invalid email address.";
          break;

        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          break;
      }

      return {
        success: false,
        message,
      };
    }
  };

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const credential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      if (!credential.user.emailVerified) {
        await signOut(auth);

        return {
          success: false,
          message:
            "Please verify your email before logging in.",
        };
      }

      return {
        success: true,
        message: "Login successful.",
      };
    } catch (error: any) {
      let message = "Invalid email or password.";

      switch (error.code) {
        case "auth/user-not-found":
          message = "User not found.";
          break;

        case "auth/wrong-password":
          message = "Wrong password.";
          break;

        case "auth/too-many-requests":
          message =
            "Too many failed attempts. Try again later.";
          break;
      }

      return {
        success: false,
        message,
      };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const forgotPassword = async (
    email: string
  ) => {
    try {
      await sendPasswordResetEmail(auth, email);

      return {
        success: true,
        message:
          "Password reset email sent successfully.",
      };
    } catch {
      return {
        success: false,
        message:
          "Unable to send password reset email.",
      };
    }
  };

  const updateProfile = async (
    data: Partial<Pick<UserData, "name" | "phone" | "attempt" | "college" | "preparationLevel">>
  ) => {
    if (!firebaseUser) {
      return { success: false, message: "You must be logged in to update your profile." };
    }
    try {
      await updateDoc(doc(db, "users", firebaseUser.uid), { ...data });
      return { success: true, message: "Profile updated successfully." };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, message: "Unable to update profile." };
    }
  };

  useEffect(() => {
    // Listens for sign-in/out, then keeps a *live* subscription on the
    // user's own Firestore doc. A live listener (rather than a one-time
    // getDoc) matters here specifically so that once a course purchase
    // writes `purchasedCourseIds` to this doc, access unlocks immediately
    // in the UI without requiring a refresh or re-login.
    let unsubscribeUserDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      // Tear down any previous user-doc listener before attaching a new one.
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = undefined;
      }

      if (firebaseUser) {
        setFirebaseUser(firebaseUser);

        unsubscribeUserDoc = onSnapshot(
          doc(db, "users", firebaseUser.uid),
          (userDoc) => {
            setUser(userDoc.exists() ? (userDoc.data() as UserData) : null);
            setLoading(false);
          },
          (error) => {
            console.error("Error subscribing to user doc:", error);
            setUser(null);
            setLoading(false);
          }
        );
      } else {
        setFirebaseUser(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",

    login,
    register,
    logout,
    forgotPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};