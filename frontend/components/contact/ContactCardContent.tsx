import { ContactItem } from "./contact.types";

interface ContactCardContentProps {
    item: ContactItem;
  }
  
export default  function ContactCardContent({ item }: ContactCardContentProps) {
    return (
      <>
        <div className="flex items-center mb-3">
          <div className="text-primary mr-2">
            {item.icon}
          </div>
          <h3 className="font-medium">{item.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm">{item.value}</p>
        {item.link && (
          <div className="mt-auto pt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {item.title === 'Email' ? 'Write me →' : 'Visit →'}
          </div>
        )}
      </>
    );
  }