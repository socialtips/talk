import React from 'react';
import styles from './styles.css';
import {withReaction} from 'plugin-api/beta/client/hocs';
import {t, can} from 'plugin-api/beta/client/services';
import {Icon} from 'plugin-api/beta/client/components/ui';
import cn from 'classnames';

const plugin = 'talk-plugin-like';

class LikeButton extends React.Component {
  handleClick = () => {
    const {
      postReaction,
      deleteReaction,
      showSignInDialog,
      addNotification,
      alreadyReacted,
      user,
    } = this.props;

    // If the current user does not exist, trigger sign in dialog.
    if (!user) {
      showSignInDialog();
      return;
    }

    // If the current user is suspended, do nothing.
    if (!can(user, 'INTERACT_WITH_COMMUNITY')) {
      addNotification('error', t('error.NOT_AUTHORIZED'));
      return;
    }

    if (alreadyReacted) {
      deleteReaction();
    } else {
      postReaction();
    }
  };

  render() {
    const {count, alreadyReacted} = this.props;
    return (
      <div className={cn(styles.container, `${plugin}-container`)}>
        <button
          className={cn(styles.button, {[styles.liked]: alreadyReacted}, `${plugin}-button`)}
          onClick={this.handleClick}
        >
          <span className={cn(`${plugin}-label`, styles.label)}>
            {t(alreadyReacted ? 'talk-plugin-like.liked' : 'talk-plugin-like.like')}
          </span>
          <Icon name="thumb_up" className={cn(`${plugin}-icon`, styles.icon)} />
          <span className={`${plugin}-count`}>{count > 0 && count}</span>
        </button>
      </div>
    );
  }
}

export default withReaction('like')(LikeButton);
