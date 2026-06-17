import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';

type TIngredientDetailsProps = {
  showTitle?: boolean;
};

export const IngredientDetails: FC<TIngredientDetailsProps> = ({
  showTitle = false
}) => {
  const { id } = useParams();
  const ingredientData = useSelector((state) =>
    state.ingredients.items.find((ingredient) => ingredient._id === id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      showTitle={showTitle}
    />
  );
};
