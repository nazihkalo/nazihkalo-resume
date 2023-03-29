import Image from 'next/image';
import {FC, memo} from 'react';

import {TimelineItem} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItem}> = memo(({item}) => {
  const {title, imageSrc, date, location, content} = item;
  return (
      <div className='flex flex-row pr-6 pl-0 gap-2 pb-3'>
        <Image
          alt={title}
          className="items-start object-left w-16 h-16  md:mr-6 md:w-24 md:h-24"
          height={64}
          src={imageSrc}
          // eslint-disable-next-line react-memo/require-usememo
          style={{objectFit: 'contain'}}
          width={64}
        />
      <div className="flex flex-col pb-8 text-center last:pb-0 md:text-left">
        <div className="flex flex-col pb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center justify-center gap-x-2 md:justify-start">
            <span className="flex-1 text-sm font-medium italic sm:flex-none">{location}</span>
            <span>•</span>
            <span className="flex-1 text-sm sm:flex-none">{date}</span>
          </div>
        </div>
        {content}
      </div>
      </div>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
