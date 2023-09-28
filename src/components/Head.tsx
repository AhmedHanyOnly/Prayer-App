
const Head = ({
  title,
  time,
  salaTime,
  TimeOutPrayer,
}: {
  title: string;
  time: string | undefined;
  salaTime: string | undefined;
  TimeOutPrayer: string | undefined;
}) => {
  return (
    <div className="row head-title">
      <div className="col-12 col-md-6">
        <div className="text">
          <div className="sub-title">{time}</div>
          <div className="title text-light">{title}</div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="text">
          <div className="sub-title ">متبقي حتي صلاة {salaTime}</div>
          <div className="title text-light">{TimeOutPrayer}</div>
        </div>
      </div>
    </div>
  );
};

export default Head;
