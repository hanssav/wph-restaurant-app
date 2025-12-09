import { ContainerWrapper } from '@/components/container/container-wrapper';
import { Hero, ListCategory, ListCategoryItems } from '@/components/pages/home';
import { CATEGORY_MENU } from '@/constants';

const HomePage = () => {
  return (
    <>
      <Hero />

      <ContainerWrapper>
        <ListCategory>
          {CATEGORY_MENU.map((category) => (
            <ListCategoryItems key={category.id} data={category} />
          ))}
        </ListCategory>
      </ContainerWrapper>
    </>
  );
};

export default HomePage;
