import React from 'react';

class NotFound extends React.Component {

  render(){
    return (
      <div className="vi-page-v2">
        <div className="vi-100vh">
          <div className="vi-flex-v2 vi-row">
            <div className="vi-flex vi-column">
              <div>
                <h1>Упс!</h1>
                <p>Похоже, вы нашли несуществующую страницу.</p>
              </div>
            </div>
          <div>
            <p style={{fontSize: '96pt', margin:'0px'}}>404</p>
          </div>
        </div>
      </div>
    </div>
    );
    }
  }

  export default NotFound;
