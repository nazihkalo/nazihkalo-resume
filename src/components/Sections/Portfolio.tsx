import {Card, Col,Grid,Link,Row, Text} from "@nextui-org/react";
import classNames from 'classnames';
import {FC, memo} from 'react';

// import {isMobile} from '../../config';
import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
// import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  console.log(portfolioItems)
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        {/* <div className=" w-full columns-2 md:columns-3 lg:columns-4"> */}
        <Grid.Container alignItems="flex-start" gap={3} justify="center">
          {portfolioItems.map((item, index) => {
            // const {title, image} = item;
            return (

                <Grid className={classNames(
                    '',
                  )} 
                key={index}
                  xs={6}>
                  {/* <Image alt={title} 
                  // placeholder="blur" 
                  height={500}
                  placeholder="empty"
                  src={image} 
                  width={500} 
                  /> */}
                  <PortfolioCard item={item} />
                  {/* <ItemOverlay item={item} /> */}
                </Grid>
              
            );
          })}
         </Grid.Container>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

// const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {url, title, description}}) => {
//   const [mobile, setMobile] = useState(false);
//   const [showOverlay, setShowOverlay] = useState(false);
//   const linkRef = useRef<HTMLAnchorElement>(null);

//   useEffect(() => {
//     // Avoid hydration styling errors by setting mobile in useEffect
//     if (isMobile) {
//       setMobile(true);
//     }
//   }, []);
//   useDetectOutsideClick(linkRef, () => setShowOverlay(false));

//   const handleItemClick = useCallback(
//     (event: MouseEvent<HTMLElement>) => {
//       if (mobile && !showOverlay) {
//         event.preventDefault();
//         setShowOverlay(!showOverlay);
//       }
//     },
//     [mobile, showOverlay],
//   );

//   return (
//     <a
//       className={classNames(
//         'absolute inset-0 h-full w-full  bg-gray-900 transition-all duration-300',
//         {'opacity-0 hover:opacity-80': !mobile},
//         showOverlay ? 'opacity-80' : 'opacity-0',
//       )}
//       href={url}
//       onClick={handleItemClick}
//       ref={linkRef}
//       target="_blank">
//       <div className="relative h-full w-full p-4">
//         <div className="flex h-full w-full flex-col gap-y-2 overflow-y-auto">
//           <h2 className="text-center font-bold text-white opacity-100">{title}</h2>
//           <p className="text-xs text-white opacity-100 sm:text-sm">{description}</p>
//         </div>
//         <ExternalLinkIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
//       </div>
//     </a>
//   );
// });


const PortfolioCard: FC<{item: PortfolioItem}> = memo(({item: {url, title, description,image}}) => (
  <Link href={url} target="_blank">
  <Card  
  css={{w: "100%", h: "300px"}}
  isHoverable 
  isPressable>
    <Card.Header css={{position: "absolute", zIndex: 1, top: 5}}>
      <Col>
        <Text color="#373737" size={14} transform="uppercase" weight="extrabold">
          {title}
        </Text>
        {/* <Text color="black" h3>
          {title}
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Body css={{p: 0}}>
      <Card.Image
        alt="Card example background"
        height="100%"
        objectFit="fill"
        src={image}
        width="100%"
      />
    </Card.Body>
    <Card.Footer
      css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
      isBlurred
    >
      <Row>
          <Text color="#000" size={12}>
            {description}
          </Text>
      </Row>
    </Card.Footer>
  </Card>
  </Link>
));