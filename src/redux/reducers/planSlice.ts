import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
      const {
        planType,
        planCategory,
        startDate,
        endDate,
        userID,
        trainerID,
        days: {dayName, sectionType, secTitle, newItem},
      } = action.payload;

      // Update plan metadata
      state.data.planType = planType;
      state.data.planCategory = planCategory;
      state.data.startDate = startDate;
      state.data.endDate = endDate;
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

    copytoAll: (state, action) => {
      const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      const {dayPlan} = action.payload;

      // Validate dayPlan structure
      if (!dayPlan || !dayPlan.meals || !Array.isArray(dayPlan.meals)) {

        return;
      }

      // Create a new array with the updated plan for all days
      state.tempDataa = days.map(day => ({
        day: day,
        meals: [...dayPlan.meals], // Copy meals
        exercises: dayPlan.exercises ? [...dayPlan.exercises] : [], // Copy exercises if they exist
      }));
    },
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
  copytoAll,
} = planSlice.actions;
export default planSlice.reducer;
