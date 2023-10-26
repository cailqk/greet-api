import { useAppDispatch, useAppSelector } from "./app/store";
import { getAllData } from "./features/peopleInfo/peopleInfoSlice";
import {
  selectCategories,
  selectIsLoading,
  selectPeople,
} from "./features/peopleInfo/peopleInfoSelectors";
import { useEffect, useState } from "react";
import Cards from "./components/People/Cards";
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { FilterCriteria } from "./utils/interfaces";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ButtonElement } from "./components/Button";
import { btnColor, btnSize, btnVariant } from "./utils/enum";

import "./App.css";

function App() {
  const people = useAppSelector(selectPeople);
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectIsLoading);

  const [filters, setFilters] = useState<FilterCriteria>({ page: 1 });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { control, reset } = useForm({
    defaultValues: {
      filterCategory: "",
      filterOrder: "",
    },
  });

  const dispatch = useAppDispatch();

  const fetchData = (criteria: FilterCriteria) => {
    dispatch(getAllData({ criteria }));
  };

  useEffect(() => {
    const criteria: FilterCriteria = {
      ...filters,
    };
    fetchData(criteria);
  }, [filters]);

  function handleScroll() {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setScrollPosition(window.scrollY);
      setFilters((prevFilters) => ({
        ...prevFilters,
        append: true,
        page: prevFilters.page && prevFilters.page + 1,
      }));
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [people]);

  const ascByName = () => {
    setDisabled(false);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      order: "asc",
      orderby: "slug",
      append: false,
    }));
    setScrollPosition(0);
  };

  const descByName = () => {
    setDisabled(false);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      order: "desc",
      orderby: "slug",
      append: false,
    }));
    setScrollPosition(0);
  };

  const ascByPrice = () => {
    setDisabled(false);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      order: "asc",
      orderby: "price",
      append: false,
    }));
    setScrollPosition(0);
  };

  const descByPrice = () => {
    setDisabled(false);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      order: "desc",
      orderby: "price",
      append: false,
    }));
    setScrollPosition(0);
  };

  const filterByCategory = (category: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
      category: category,
      append: false,
    }));
    setScrollPosition(0);
  };

  const resetFilters = () => {
    reset();
    setDisabled(true);
    setScrollPosition(0);
    setFilters({ append: false, page: 1 });
  };

  return (
    <Container className={isLoading ? "blur" : ""}>
      <Box>
        <Box
          marginTop={5}
          marginBottom={5}
          sx={{ alignItems: "center", display: "flex", gap: "2rem" }}
        >
          <Typography>Filter by Category</Typography>
          <FormControl>
            <Controller
              name="filterCategory"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(event) => {
                    setDisabled(false);
                    field.onChange(event.target.value);
                  }}
                  sx={{
                    height: "auto",
                    width: "16rem",
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      onClick={() => filterByCategory(category.id)}
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Typography>Sort by Name/Price</Typography>
          <FormControl>
            <Controller
              name="filterOrder"
              control={control}
              render={({ field }) => (
                <Select
                  sx={{
                    height: "auto",
                    width: "16rem",
                  }}
                  {...field}
                  onChange={(event) => {
                    setDisabled(false);
                    field.onChange(event.target.value);
                  }}
                >
                  <MenuItem value="name asc" onClick={ascByName}>
                    Name <ArrowUpwardIcon />
                  </MenuItem>
                  <MenuItem value="name desc" onClick={descByName}>
                    Name <ArrowDownwardIcon />
                  </MenuItem>
                  <MenuItem value="price asc" onClick={ascByPrice}>
                    Price <ArrowUpwardIcon />
                  </MenuItem>
                  <MenuItem value="price desc" onClick={descByPrice}>
                    Price <ArrowDownwardIcon />
                  </MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <FormControl sx={{ marginLeft: "auto" }}>
            <ButtonElement
              text="Reset"
              action={resetFilters}
              color={btnColor.ERROR}
              size={btnSize.LARGE}
              variant={btnVariant.CONTAINED}
              disabled={disabled}
            />
          </FormControl>
        </Box>
        <Box>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              "@media (min-width: 768px)": {
                justifyContent: "flex-start",
              },
            }}
          >
            <Cards people={people} />
          </Grid>
        </Box>
      </Box>
      <Modal
        open={isLoading}
        sx={{
          top: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <p style={{ color: "white", fontSize: 25, marginRight: 10 }}>
            Loading...
          </p>
          <CircularProgress />
        </>
      </Modal>
    </Container>
  );
}

export default App;
