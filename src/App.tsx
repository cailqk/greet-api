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
import { Controller } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { FilterCriteria } from "./utils/interfaces";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./App.css";
import { ButtonElement } from "./components/Button";
import { useForm } from "react-hook-form";
import { btnColor, btnSize, btnVariant } from "./utils/enum";

function App() {
  const people = useAppSelector(selectPeople);
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectIsLoading);

  let p: number = 1;
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [disabled, setDisabled] = useState<boolean>(true);

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

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      p++;
      setFilters({ append: true, page: p });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ascByName = () => {
    setDisabled(false);
    setFilters({ order: "asc", orderby: "slug", append: false });
  };

  const descByName = () => {
    setDisabled(false);
    setFilters({ order: "desc", orderby: "slug", append: false });
  };

  const ascByPrice = () => {
    setDisabled(false);
    setFilters({ order: "asc", orderby: "price", append: false });
  };

  const descByPrice = () => {
    setDisabled(false);
    setFilters({ order: "desc", orderby: "price", append: false });
  };

  const resetFilters = () => {
    reset();
    setFilters({ append: false });
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
                  {categories &&
                    categories.map((category) => (
                      <MenuItem
                        defaultValue={category.id}
                        value={category.name}
                        onClick={() => {
                          setFilters({ category: category.id });
                        }}
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
                  onChange={(event) => field.onChange(event.target.value)}
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
            justifyContent="flex-start"
            alignItems="flex-start"
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
        <CircularProgress />
      </Modal>
    </Container>
  );
}

export default App;
