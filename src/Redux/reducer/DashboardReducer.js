import produce from "immer";
import {
  COST_BY_CATEGORY,
  FETCH_FOOD_COUNT,
  FORECASTED_SALES,
  LOSS_IN_KITCHEN,
  PRICE_FLUCTATION,
  TOTAL_ORDERS,
} from "../actions/DashboardActions/Types";

const initialState = {
  firstSection: {
    isLoading: false,
    isError: false,
    menuItems: 0,
    orderItems: 0,
    customerItems: 0,
  },
  lossInKitchen: {
    isLoading: false,
    isError: false,
    list: [],
    totalLoss: 0,
  },
  costByCategory: {
    isLoading: false,
    isError: false,
    list: [],
    totalPrice: 0,
  },
  forecastedSales: {
    isLoading: false,
    isError: false,
    revenue: 0,
    sales: 0,
    actualSale: 0,
    interval: "month",
    startDate: "",
    endDate: "",
    graphData: [],
  },
  priceFluctuation: {
    isLoading: false,
    isError: false,
    list: [],
  },
  totalOrders: {
    isLoading: false,
    isError: false,
    list: [],
    count: "",
    totalCost: "",
  },
};

export const dashboardReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case PRICE_FLUCTATION.REQUESTED: {
        state.priceFluctuation.isLoading = true;
        state.priceFluctuation.isError = false;
        break;
      }
      case PRICE_FLUCTATION.SUCCEEDED: {
        state.priceFluctuation.isLoading = false;
        state.priceFluctuation.isError = false;
        state.priceFluctuation.list = payload;
        break;
      }
      case PRICE_FLUCTATION.FAILED: {
        state.priceFluctuation.isLoading = false;
        state.priceFluctuation.isError = true;
        break;
      }
      case FORECASTED_SALES.REQUESTED: {
        state.forecastedSales.isLoading = true;
        state.forecastedSales.isError = false;
        break;
      }
      case FORECASTED_SALES.SUCCEEDED: {
        state.forecastedSales.isLoading = false;
        state.forecastedSales.isError = false;
        state.forecastedSales.actualSale = payload.actualSale;
        state.forecastedSales.revenue = payload.netProfit;
        state.forecastedSales.sales = payload.forecast?.sales;
        state.forecastedSales.interval = payload.interval;
        state.forecastedSales.startDate = payload.startDate;
        state.forecastedSales.endDate = payload.endDate;
        state.forecastedSales.graphData = payload.graphData;
        break;
      }
      case FORECASTED_SALES.FAILED: {
        state.forecastedSales.isLoading = false;
        state.forecastedSales.isError = true;
        break;
      }
      case COST_BY_CATEGORY.REQUESTED: {
        state.costByCategory.isLoading = true;
        state.costByCategory.isError = false;
        break;
      }
      case COST_BY_CATEGORY.SUCCEEDED: {
        state.costByCategory.isLoading = false;
        state.costByCategory.isError = false;
        state.costByCategory.list = payload.data;
        state.costByCategory.totalPrice = payload.totalCost ?? 0;
        break;
      }
      case COST_BY_CATEGORY.FAILED: {
        state.costByCategory.isLoading = false;
        state.costByCategory.isError = true;
        break;
      }
      case LOSS_IN_KITCHEN.REQUESTED: {
        state.lossInKitchen.isLoading = true;
        state.lossInKitchen.isError = false;
        break;
      }
      case LOSS_IN_KITCHEN.SUCCEEDED: {
        state.lossInKitchen.isLoading = false;
        state.lossInKitchen.isError = false;
        state.lossInKitchen.list = payload.data;
        state.lossInKitchen.totalLoss = payload.totalRevenue ?? 0;
        break;
      }
      case LOSS_IN_KITCHEN.FAILED: {
        state.lossInKitchen.isLoading = false;
        state.lossInKitchen.isError = true;
        break;
      }
      case FETCH_FOOD_COUNT.REQUESTED: {
        state.firstSection.isLoading = true;
        state.firstSection.isError = false;
        break;
      }
      case FETCH_FOOD_COUNT.SUCCEEDED: {
        state.firstSection.isLoading = false;
        state.firstSection.isError = false;
        state.firstSection.menuItems = payload.mealCount;
        state.firstSection.orderItems = payload.orderCount;
        state.firstSection.customerItems = payload.customerCount;
        break;
      }
      case FETCH_FOOD_COUNT.FAILED: {
        state.firstSection.isLoading = false;
        state.firstSection.isError = true;
        state.firstSection.menuItems = 0;
        state.firstSection.orderItems = 0;
        state.firstSection.customerItems = 0;
        break;
      }

      case TOTAL_ORDERS.REQUESTED: {
        if (payload) {
          state.totalOrders.isLoading = true;
        }
        state.totalOrders.isError = false;
        break;
      }
      case TOTAL_ORDERS.SUCCEEDED: {
        const doneOrders = payload?.doneOrders;
        const paidOrders = payload?.paidOrders;
        const createdOrders = payload?.createdOrders;
        const all = [
          ...doneOrders?.dineInOrdersDone,
          ...doneOrders?.takeAwayOrdersDone,
          ...doneOrders?.deliveryOrdersDone,

          ...paidOrders?.dineInOrdersPaid,
          ...paidOrders?.takeAwayOrdersPaid,
          ...paidOrders?.deliveryOrdersPaid,

          ...createdOrders?.dineInOrdersCreated,
          ...createdOrders?.takeAwayOrdersCreated,
          ...createdOrders?.deliveryOrdersCreated,
        ];

        let cost = 0;

        all.map((a) => {
          cost += a.orderUnitCost;
        });

        state.totalOrders.isLoading = false;
        state.totalOrders.isError = false;
        state.totalOrders.count = payload?.totalCount;
        state.totalOrders.totalCost = cost;
        state.totalOrders.list = [
          ...all.map((item) =>
            item.catalog.map((data) => ({ ...data, timestamp: item.timestamp }))
          ),
        ].flat(Infinity);
        break;
      }
      case TOTAL_ORDERS.FAILED: {
        state.totalOrders.isLoading = false;
        state.totalOrders.isError = true;
        state.totalOrders.list = [];
        break;
      }
      default:
        return state;
    }
    return state;
  }
);
