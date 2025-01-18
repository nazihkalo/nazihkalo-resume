import {Card, Col, Grid, Row, Text} from "@nextui-org/react";
import classNames from 'classnames';
import {FC, memo} from 'react';

import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        <Grid.Container alignItems="flex-start" gap={3} justify="center">
          {portfolioItems.map((item, index) => {
            return (
              <Grid 
                className={classNames('')} 
                key={index}
                xs={6}
              >
                <PortfolioCard item={item} />
              </Grid>
            );
          })}
        </Grid.Container>
      </div>
    </Section>
  );
});

const PortfolioCard: FC<{item: PortfolioItem}> = ({item}) => {
  return (
    <Card>
      <Card.Body className="p-0">
        <Card.Image
          src={item.image}
          objectFit="cover"
          width="100%"
          height={340}
          alt={item.title}
        />
      </Card.Body>
      <Card.Footer
        className="absolute bottom-0 z-[1] border-t-[1px] border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.4)] backdrop-blur-md"
      >
        <Row>
          <Col>
            <Text color="#fff" size={12}>
              {item.title}
            </Text>
            <Text color="#fff" size={12}>
              {item.description}
            </Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

Portfolio.displayName = 'Portfolio';
export default Portfolio;