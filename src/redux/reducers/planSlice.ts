import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';

// Types
type MealItem = {
  name: string;
  quantity: string;
};

type Meal = {
  subHeading: string;
  items: MealItem[];
};

type Exercise = {
  name: string;
  description: string;
};

type DayPlan = {
  day: string;
  meals: Meal[];
  exercises: Exercise[];
};

type PlanData = {
  planType: string;
  planCategory: string;
  startDate: string;
  endDate: string;
  userID: string;
  trainerID: string;
  days: DayPlan[];
};

type AddItemPayload = {
  planType: string;
  planCategory: string;
  startDate: string;
  endDate: string;
  trainerID: string;
  userID: string;
  days: {
    dayName: string;
    sectionType: string;
    secTitle?: string;
    newItem: MealItem | Exercise;
  };
};
type ActivityItem = {
  name: string;
  quantity: string;
};

type meals = {
  subHeading: string;
  items: ActivityItem[];
};

type tempData = {
  day: string;
  meals: meals[];
  exercises: Exercise[];
};
type PlanState = {
  data: PlanData;
  tempDataa: tempData[];
};

const initialState: PlanState = {
  data: {
    planType: '',
    planCategory: '',
    startDate: '',
    endDate: '',
    userID: '',
    trainerID: '',
    days: [],
  },
  tempDataa: [],
};

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    addPlanItem: (state, action: PayloadAction<AddItemPayload>) => {


      console.log("ACTIONS ADD PLAN ITEM",action.payload)
      const {
     
        userID,
        trainerID,
        days: {dayName, sectionType, secTitle, newItem},
      } = action.payload;

      // Update plan metadata
    
      state.data.userID = userID;
      state.data.trainerID = trainerID;

      // Find or create the day
      let dayIndex = state.data.days.findIndex(day => day.day === dayName);
      if (dayIndex === -1) {
        state.data.days.push({
          day: dayName,
          meals: [],
          exercises: [],
        });
        dayIndex = state.data.days.length - 1;
      }
      const day = state.data.days[dayIndex];

      if (sectionType === 'meal') {
        // Handle meal items
        if (!secTitle) {
          throw new Error('secTitle is required for meal items');
        }

        const mealIndex = day.meals.findIndex(
          meal => meal.subHeading === secTitle,
        );
        if (mealIndex === -1) {
          day.meals.push({
            subHeading: secTitle,
            items: [newItem as MealItem],
          });
        } else {
          day.meals[mealIndex].items.push(newItem as MealItem);
        }
      } else if (sectionType === 'exercise') {
        // Handle exercise items
        day.exercises.push(newItem as Exercise);
      }
    },
addFoodItem: (state, action) => {
  const { day, mealName, foodItem } = action.payload;

  // Find the selected day in tempDataa
  const dayIndex = state.tempDataa.findIndex(d => d.day === day);
  if (dayIndex === -1) return;

  // Find the selected meal category
  const mealIndex = state.tempDataa[dayIndex].meals.findIndex(
    m => m.subHeading === mealName
  );
  if (mealIndex === -1) return;

  // Add food item to items array
  state.tempDataa[dayIndex].meals[mealIndex].items.push(foodItem);
},
addExerciseItem: (state, action) => {
  const { day, exerciseName, exerciseItem } = action.payload;
console.log("ADD EXERCISE ITEM",action.payload)
  const dayIndex = state.tempDataa.findIndex(d => d.day === day);
  if (dayIndex === -1) return;

  const sectionIndex = state.tempDataa[dayIndex].exercises.findIndex(
    s => s.subHeading === exerciseName
  );
  if (sectionIndex === -1) return;

  state.tempDataa[dayIndex].exercises[sectionIndex].items.push(exerciseItem);
},





    addMealItem: (state, action) => {
      const {selectedDate} = action.payload;
      const dayExists = state.tempDataa.some(item => item.day === selectedDate);
      if (dayExists) {
        state.tempDataa = state.tempDataa.map(dayItem => {
          if (dayItem.day === selectedDate) {
            const nextCategoryNumber = dayItem.meals.length + 1;
            const newCategory = {
              subHeading: `Meal ${nextCategoryNumber}`,
              items: [],
            };
            return {
              ...dayItem,
              meals: [...dayItem.meals, newCategory],
            };
          }
          return dayItem;
        });
      } else {
        const newDay = {
          day: selectedDate,

          meals: [{subHeading: 'Meal 1', items: []}],
          exercises: [],
        };
        state.tempDataa = [...state.tempDataa, newDay];
      }
    },

    removeMealItem: (state, action) => {
      const {day, mealName} = action.payload;

      state.tempDataa = state.tempDataa.map(dayItem => {
        if (dayItem.day === day) {
          const filteredCategories = dayItem.meals.filter(
            category => category.subHeading !== mealName,
          );
          const reindexedCategories = filteredCategories.map(
            (category, index) => ({
              ...category,
              subHeading: `Meal ${index + 1}`,
            }),
          );

          return {
            ...dayItem,
            meals: reindexedCategories,
          };
        }
        return dayItem;
      });
    },

    addSingleItem: (state, action) => {
      const {day, mealData, mealName} = action.payload;

      return {
        ...state,
        tempDataa: state.tempDataa.map(dayEntry => {
          if (dayEntry.day === day) {
            return {
              ...dayEntry,
              meals: dayEntry.meals.map(category =>
                category.subHeading === mealName
                  ? {...category, items: [...category.items, mealData]}
                  : category,
              ),
            };
          }
          return dayEntry;
        }),
      };
    },
    addExercise: (state, action) => {
      const {day, item} = action.payload;

      return {
        ...state,
        tempDataa: state.tempDataa.map(dayEntry => {
          if (dayEntry.day === day) {
            return {
              ...dayEntry,
              exercises: [...(dayEntry.exercises ?? []), item],
            };
          }
          return dayEntry;
        }),
      };
    },
    removeExercise: (state, action) => {
      const {day, index} = action.payload;

      return {
        ...state,
        tempDataa: state.tempDataa.map(dayEntry => {
          if (dayEntry.day === day) {
            const currentExercises = dayEntry.exercises || [];
            const updatedExercises = currentExercises.filter(
              (exercise, i) => i !== index,
            );
            if (updatedExercises.length !== currentExercises.length) {
              return {
                ...dayEntry,
                exercises: updatedExercises,
              };
            }
          }
          return dayEntry;
        }),
      };
    },
copyToAll: (state, action) => {
  const { dayPlan, startingDate, endingDate } = action.payload;
  if (!dayPlan || !startingDate || !endingDate) return;

  const start = new Date(startingDate);
  const end = new Date(endingDate);

  let current = new Date(start);

  while (current.getTime() <= end.getTime()) {
    const dayISO = moment(current)
      .utcOffset(moment().utcOffset(), true)
      .format("YYYY-MM-DDTHH:mm:ssZ");

    const existingDay = state.tempDataa.find(d => d.day === dayISO);

    if (existingDay) {
      existingDay.meals = JSON.parse(JSON.stringify(dayPlan.meals));
      existingDay.exercises = JSON.parse(JSON.stringify(dayPlan.exercises));
    } else {
      state.tempDataa.push({
        day: dayISO,
        meals: JSON.parse(JSON.stringify(dayPlan.meals)),
        exercises: JSON.parse(JSON.stringify(dayPlan.exercises)),
      });
    }

    current.setDate(current.getDate() + 1);
  }
}

,

    // copytoAll: (state, action) => {
    //   const days = [
    //     'Monday',
    //     'Tuesday',
    //     'Wednesday',
    //     'Thursday',
    //     'Friday',
    //     'Saturday',
    //     'Sunday',
    //   ];
    //   const {dayPlan} = action.payload;


    //   console.log({dayPlan})
    //   if (!dayPlan || !dayPlan.meals || !Array.isArray(dayPlan.meals)) {

    //     return;
    //   }
    //   state.tempDataa = days.map(day => ({
    //     day: day,
    //     meals: [...dayPlan.meals], 
    //     exercises: dayPlan.exercises ? [...dayPlan.exercises] : [],
    //   }));
    // },
    resetPlan: () => initialState,
    initializePlan: (state, action: PayloadAction<PlanData>) => {
      state.data = action.payload;
    },
  },
});

export const {
  addPlanItem,
  resetPlan,
  initializePlan,
  addSingleItem,
  addMealItem,
  removeMealItem,
  addExercise,
  removeExercise,
  copyToAll,
   addFoodItem, 
   addExerciseItem
} = planSlice.actions;
export default planSlice.reducer;
