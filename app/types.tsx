export const mainMuscleGrourArr = [
  { nameRu: "Бицепс", nameEn: "biceps" },
  { nameRu: "Трицепс", nameEn: "triceps" },
  { nameRu: "Грудь", nameEn: "chest" },
  { nameRu: "Ноги", nameEn: "legs" },
  { nameRu: "Плечи", nameEn: "shoulders" },
  { nameRu: "Спина", nameEn: "back" },
];

export const filterElements = [
  { nameEn: "popular", nameRu: "По популярности", increment: true },
  { nameEn: "raiting", nameRu: "По увеличению рейтинга", increment: true },
  { nameEn: "raiting", nameRu: "По уменьшению рейтинга", increment: false },
  { nameEn: "name", nameRu: "По имени", increment: true },
];

export const raitingExerciseArr = [
  { nameRu: "1", nameEn: "1" },
  { nameRu: "2", nameEn: "2" },
  { nameRu: "3", nameEn: "3" },
  { nameRu: "4", nameEn: "4" },
  { nameRu: "5", nameEn: "5" },
];

export interface asyncThunkStatus {}

export interface IExercises {}

export interface IComment {
  _id: string | undefined;
  data: Date;
  exerciseId: string | undefined;
  score: number | undefined;
  text: string | undefined;
  userId: { email: string; name: string } | undefined;
}

export interface IExercise {
  _id: string | undefined;
  id: string | undefined;
  name: string | undefined;
  image?: string | undefined;
  isBest: boolean | undefined;
  type: string | undefined;
  raiting: number | undefined;
  video: string | undefined;
  description: string | undefined;
  muscleGroups: string[] | undefined;
  mainGroup: string | undefined;
  mainGroupRu: string | undefined;
  createdUserId?: string | undefined;
  comments: IComment[] | undefined;
  avgUsersRaiting?: string;
}

export interface IWorkout {
  _id: string;
  comments: string;
  date: Date;
  userId: string;
  name: string;
  exercisesArr:
    | [
        {
          name: string;
          exercise: { id: string; name: string; _id: string };
          exerciseId: string;
          reps: number;
          sets: number;
        },
      ]
    | [];
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  workoutsArr?: IWorkout[];
  exercisesArr?: IExercise[];
  reviewsArr?: String[];
}

export interface IResponseUser {
  message: string;
  result: IUser;
}

export interface IResponseArrExercises {
  message: string;
  result?: IExercise[];
}

export interface IResponseOneExercise {
  message: string;
  result?: IExercise;
}

export interface IUserSchema {
  email: String;
  name: String;
  password: String;
  workoutsArr?: String[];
  exercisesArr?: String[];
  reviewsArr?: String[];
}

export interface IWorkoutSchema {
  comments: String;
  date: Date;
  userId: String;
  name?: String;
  exercisesArr: [{ name: String; id: String; sets: Number; reps: Number }];
}

export interface IExerciseSchema {
  id: String;
  name: String;
  image?: String;
  imageFile?: File | undefined;
  isBest?: Boolean;
  type: String;
  raiting?: Number;
  muscleGroups: String[];
  video: String;
  description: String;
  mainGroup: String;
  mainGroupRu: String;
  commentsArr?: String[];
  createdUserId?: String;
  avgUsersRaiting?: String;
}

export interface ICommentSchema {
  data: Date;
  score: Number;
  text: String;
  exerciseId: String;
  userId: String;
}

export interface IOneExerciseTypes {
  nameRu: string;
  nameEn: string;
}

export interface IExercisesTypes {
  nameRu: string;
  nameEn: string;
}
[];

export const exerciseTypes: IOneExerciseTypes[] = [
  { nameRu: "Бицепс", nameEn: "biceps" },
  { nameRu: "Трицепс", nameEn: "triceps" },
  { nameRu: "Грудь", nameEn: "chest" },
  { nameRu: "Ноги", nameEn: "legs" },
  { nameRu: "Плечи", nameEn: "shoulders" },
  { nameRu: "Спина", nameEn: "back" },
];
